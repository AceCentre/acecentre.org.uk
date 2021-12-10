import withSession from "../../../lib/auth/with-session";
import { checkout, updateCustomer } from "../../../lib/cart/checkout";
import { clientRequest } from "../../../lib/client-request";
import { addToMailingList } from "../auth/register";
import { EMPTY_CART } from "./update";
import config from "../../../lib/config";
import fetch from "node-fetch";

async function handler(req, res) {
  console.log("-------");
  console.log("Checkout began");
  const body = JSON.parse(req.body);

  let result;
  try {
    // Add to mailing list
    if (body.addToMailingList) {
      console.log("Started adding to the mailing list");

      await addToMailingList(body.billingDetails.email);
      console.log("Added to the mailing list");
    }
    console.log("Started updating Customer");

    await updateCustomer(req, body);
    console.log("Updated Customer");

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

      result = await checkout(req, body, cohortNames);
      console.log("Checked out with cohort");
    } else {
      console.log("Started checking out without cohort");

      result = await checkout(req, body);
      console.log("Checked out without cohort");
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
      await fetch(`${currentUrl}/api/cart/add-to-cohort-background`, {
        method: "POST",
        headers: { cookie: cookieHeader },
        body: JSON.stringify({
          groupPurchaseEmails: body.groupPurchaseEmails,
          cohortNames,
        }),
      });
      console.log("Added to cohort");
    }

    console.log("Started emptying cart");
    await clientRequest(req, EMPTY_CART);
    console.log("Emptied cart");
    console.log("-------");

    res.send({ success: true, result });
    return;
  } catch (error) {
    const errors = error?.response?.errors || [];
    const mainError = errors[0] || null;
    const errorMessage = mainError?.message || "An error has occurred";

    console.log({ error, mainError, errorMessage });

    // If the cart is already empty then lets just continue
    if (errorMessage === "Cart is empty") {
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
