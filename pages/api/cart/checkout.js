import withSession from "../../../lib/auth/with-session";
import { checkout } from "../../../lib/cart/checkout";

import config from "../../../lib/config";
import fetch from "node-fetch";

async function handler(req, res) {
  console.log("-------");
  console.log("Checkout began");
  const body = JSON.parse(req.body);

  let startTime = Date.now();
  let endTime = Date.now();
  console.log({ startTime, endTime });
  let result;
  try {
    // Add to mailing list
    // if (body.addToMailingList) {
    //   console.log("Started adding to the mailing list");

    //   startTime = Date.now();
    //   await addToMailingList(body.billingDetails.email);
    //   endTime = Date.now();
    //   console.log("Added to the mailing list", endTime - startTime);
    // }
    // console.log("Started updating Customer");

    // startTime = Date.now();
    // await updateCustomer(req, body);
    // endTime = Date.now();
    // console.log("Updated Customer", endTime - startTime);

    let uniqueCohortTag;
    let cohortNames;
    if (Object.keys(body.groupPurchaseEmails).length > 0) {
      uniqueCohortTag = new Date().toTimeString();
      cohortNames = Object.keys(body.groupPurchaseEmails).map((x) => {
        return {
          productId: parseInt(x),
          cohortName: `${uniqueCohortTag} => ${x}`,
        };
      });
      console.log("Started checking out with cohort");

      startTime = Date.now();
      result = await checkout(req, body, cohortNames);
      endTime = Date.now();
      console.log("Checked out with cohort", endTime - startTime);
    } else {
      console.log("Started checking out without cohort");

      startTime = Date.now();
      result = await checkout(req, body);
      endTime = Date.now();
      console.log("Checked out without cohort", endTime - startTime);
    }

    let currentUrl = "http://localhost:3000";
    let cookieHeader = req.headers.cookie;

    if (config.environment !== "development") {
      currentUrl = "https://" + req.headers.host;
      cookieHeader = req.headers.cookie;

      console.log({ cookieHeader, currentUrl });
    }

    if (Object.keys(body.groupPurchaseEmails).length > 0) {
      console.log("Started adding to cohort");
      startTime = Date.now();
      await fetch(`${currentUrl}/.netlify/functions/add-to-cohort-background`, {
        method: "POST",
        headers: { cookie: cookieHeader },
        body: JSON.stringify({
          groupPurchaseEmails: body.groupPurchaseEmails,
          cohortNames,
        }),
      });
      endTime = Date.now();
      console.log("Added to cohort", endTime - startTime);
    }

    // console.log("Started emptying cart");
    // startTime = Date.now();
    // await clientRequest(req, EMPTY_CART);
    // endTime = Date.now();
    // console.log("Emptied cart", endTime - startTime);
    // console.log("-------");

    res.send({ success: true, result });
    return;
  } catch (error) {
    const errors = error?.response?.errors || [];
    const mainError = errors[0] || null;
    const errorMessage = mainError?.message || "An error has occurred";

    console.log({ error, mainError, errorMessage });

    // If the cart is already empty then lets just continue
    if (errorMessage === "Cart is empty") {
      endTime = Date.now();
      console.log("Emptied cart, (with error)", endTime - startTime);
      res.send({ success: true, result });
      return;
    }

    if (errorMessage.includes("this username is already registered")) {
      res.send({ success: false, error: "This email is already in use" });
      return;
    }

    if (errorMessage.includes("this email is already registered")) {
      res.send({ success: false, error: "This email is already in use" });
      return;
    }

    if (
      errorMessage.includes(
        "An account is already registered with your email address"
      )
    ) {
      res.send({ success: false, error: "This email is already in use" });
      return;
    }

    console.log("-------");
    res.send({ success: false, error: errorMessage });
    return;
  }
}

export default withSession(handler);
