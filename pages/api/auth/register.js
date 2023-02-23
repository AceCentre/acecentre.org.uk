import { gql, GraphQLClient } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import config from "../../../lib/config";
import { LOGIN_MUTATION } from "./login";

const ENDPOINT = `${config.baseUrl}/graphql`;

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

async function handler(req, res) {
  // get user from database then
  const body = JSON.parse(req.body);
  const email = body.email;
  const password = body.password;

  try {
    let headers = {};
    if (req && req.socket && req.socket.remoteAddress) {
      headers["X-Forwarded-For"] = req.socket.remoteAddress;
    }

    if (req && req.headers && req.headers["client-ip"]) {
      headers["X-Forwarded-For"] = req.headers["client-ip"];
    }

    if (process.env["WORDPRESS_DO_SHARED_SECRET"]) {
      headers["x-do-secret"] = process.env["WORDPRESS_DO_SHARED_SECRET"];
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
