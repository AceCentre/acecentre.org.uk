import { gql, GraphQLClient } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import config from "../../../lib/config";
import { LOGIN_MUTATION } from "./login";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { App } from "@slack/bolt";

const ENDPOINT = `${config.baseUrl}/graphql`;
const app = new App(config.slack);

const REGISTER_MUTATION = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    registerCustomer(
      input: { email: $email, password: $password, username: $email }
    ) {
      customer {
        id
      }
    }
  }
`;

mailchimp.setConfig({
  apiKey: config.mailchimp.apiKey,
  server: config.mailchimp.server,
});

export async function addToMailingList(email) {
  try {
    await mailchimp.lists.addListMember("ec5a06da07", {
      email_address: email,
      status: "subscribed",
    });
  } catch (error) {
    console.log(error);
    await app.client.chat.postMessage({
      channel: "C02E0MC3HB2",
      text: `Failed to add the email ${email} to the mailing list at checkout. This is probably because they are already on the mailing list but double check.`,
    });
  }
}

async function handler(req, res) {
  // get user from database then
  const body = JSON.parse(req.body);
  const email = body.email;
  const password = body.password;
  const mailingList = body.mailingList === true ? true : false;

  try {
    if (mailingList) {
      await addToMailingList(email);
    }

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

    await client.rawRequest(REGISTER_MUTATION, {
      email,
      password,
    });

    const { data: loginResponse } = await client.rawRequest(LOGIN_MUTATION, {
      username: email,
      password,
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
    // req.session.set("cart", {
    //   wooSessionToken: loginResponse.login.user.wooSessionToken,
    // });

    await req.session.save();

    res.send({ success: true });
  } catch (error) {
    console.log(error);

    const errors = error?.response?.errors || [];
    const mainError = errors[0] || null;
    const errorMessage = mainError?.message || "An error has occurred";

    res.send({ success: false, errorMessage: normaliseError(errorMessage) });
  }
}

const normaliseError = (errorMessage) => {
  if (errorMessage.includes("this username is already registered")) {
    return "This email is already in use";
  }

  if (errorMessage.includes("this email is already registered")) {
    return "This email is already in use";
  }

  if (
    errorMessage.includes(
      "An account is already registered with your email address"
    )
  ) {
    return "This email is already in use";
  }

  return errorMessage;
};

export default withSession(handler);
