import withSession from "../../../lib/auth/with-session";
import { checkout, updateCustomer } from "../../../lib/cart/checkout";
import { clientRequest } from "../../../lib/client-request";
import { LOGIN_MUTATION } from "../auth/login";
import { addToMailingList } from "../auth/register";
import { EMPTY_CART } from "./update";
import config from "../../../lib/config";
import { GraphQLClient } from "graphql-request";
import fetch from "node-fetch";

const ENDPOINT = `${config.baseUrl}/graphql`;

async function handler(req, res) {
  const body = JSON.parse(req.body);

  let result;
  try {
    // Add to mailing list
    if (body.addToMailingList) {
      await addToMailingList(body.billingDetails.email);
    }

    await updateCustomer(req, body);

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
      result = await checkout(req, body, cohortNames);
    } else {
      result = await checkout(req, body);
    }

    if (
      body.accountDetails.createAccount &&
      body.billingDetails.email &&
      body.accountDetails.password
    ) {
      await login(req, body);
    }

    if (Object.keys(body.groupPurchaseEmails).length > 0) {
      let currentUrl = "http://localhost:3000";
      let cookieHeader = req.headers.cookie;

      if (config.environment !== "development") {
        currentUrl =
          "https" +
          req.netlifyFunctionParams.event.rawUrl
            .replace("https://")
            .split("/")[0];

        cookieHeader = req.netlifyFunctionParams.event.headers.cookie;
      }

      await fetch(`${currentUrl}/api/cart/add-to-cohort-background`, {
        method: "POST",
        headers: { cookie: cookieHeader },
        body: JSON.stringify({
          groupPurchaseEmails: body.groupPurchaseEmails,
          cohortNames,
        }),
      });
    }

    await clientRequest(req, EMPTY_CART);

    res.send({ success: true, result });
    return;
  } catch (error) {
    console.log(error);

    const errors = error?.response?.errors || [];
    const mainError = errors[0] || null;
    const errorMessage = mainError?.message || "An error has occurred";

    // If the cart is already empty then lets just continue
    if (errorMessage === "Cart is empty") {
      res.send({ success: true, result });
      return;
    }

    res.send({ success: false, error: errorMessage });
    return;
  }
}

const login = async (req, body) => {
  let headers = {};
  if (req && req.socket && req.socket.remoteAddress) {
    headers["X-Forwarded-For"] = req.socket.remoteAddress;
  }

  if (req && req.headers && req.headers["client-ip"]) {
    headers["X-Forwarded-For"] = req.headers["client-ip"];
  }

  const client = new GraphQLClient(ENDPOINT, {
    headers,
  });

  const { data: loginResponse } = await client.rawRequest(LOGIN_MUTATION, {
    username: body.billingDetails.email,
    password: body.accountDetails.password,
  });

  const user = {
    authToken: loginResponse.login.authToken,
    refreshToken: loginResponse.login.refreshToken,
    userId: loginResponse.login.user.id,
    customerId: loginResponse.login.customer.id,
    wooSessionToken: loginResponse.login.user.wooSessionToken,
    username: loginResponse.login.user.username,
  };

  req.session.set("user", user);
  req.session.set("cart", {
    wooSessionToken: loginResponse.login.user.wooSessionToken,
  });

  await req.session.save();
};

export default withSession(handler);
