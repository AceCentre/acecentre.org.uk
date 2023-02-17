import { gql, GraphQLClient } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import config from "../../../lib/config";

const ENDPOINT = `${config.baseUrl}/graphql`;

export const LOGIN_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      refreshToken
      user {
        id
        username
        wooSessionToken
      }
      customer {
        id
      }
    }
  }
`;

async function handler(req, res) {
  // get user from database then
  const body = JSON.parse(req.body);
  const username = body.username;
  const password = body.password;

  let headers = {};
  try {
    if (req && req.socket && req.socket.remoteAddress) {
      console.log("req.socket.remoteAddress", req.socket.remoteAddress);
      headers["X-Forwarded-For"] = req.socket.remoteAddress;
    }

    if (req && req.headers && req.headers["client-ip"]) {
      console.log("client-ip", req.headers["client-ip"]);
      headers["X-Forwarded-For"] = req.headers["client-ip"];
    }

    if (req && req.headers && req.headers["x-real-ip"]) {
      console.log("x-real-ip", req.headers["x-real-ip"]);
      headers["X-Forwarded-For"] = req.headers["x-real-ip"];
    }

    if (req && req.headers && req.headers["x-forwarded-for"]) {
      console.log("x-forwarded-for", req.headers["x-forwarded-for"]);
      headers["X-Forwarded-For"] = req.headers["x-forwarded-for"];
    }
    if (req && req.headers && req.headers["do-connecting-ip"]) {
      console.log("do-connecting-ip", req.headers["do-connecting-ip"]);
      headers["X-Forwarded-For"] = req.headers["do-connecting-ip"];
    }

    if (process.env["WORDPRESS_DO_SHARED_SECRET"]) {
      headers["x-do-secret"] = process.env["WORDPRESS_DO_SHARED_SECRET"];
    }

    console.log("FINAL HEADERS", headers);

    const client = new GraphQLClient(ENDPOINT, {
      headers,
    });
    const { data: queryResponse } = await client.rawRequest(LOGIN_MUTATION, {
      username,
      password,
    });

    const user = {
      authToken: queryResponse.login.authToken,
      refreshToken: queryResponse.login.refreshToken,
      userId: queryResponse.login.user.id,
      username: queryResponse.login.user.username,
      customerId: queryResponse.login.customer.id,
      wooSessionToken: queryResponse.login.user.wooSessionToken,
    };

    req.session.set("user", user);
    // No longer set the session token when you login to persist your old cart
    // req.session.set("cart", {
    //   wooSessionToken: queryResponse.login.user.wooSessionToken,
    // });

    await req.session.save();
    res.send({ success: true });
  } catch (error) {
    if (error.response && error.response.errors && error.response.errors) {
      const firstError = error.response.errors[0];
      return res.send({
        success: false,
        error: firstError.message,
      });
    }
    if (error.response && error.response.error) {
      return res.send({
        success: false,
        error: error.response.error,
      });
    }

    return res.send({
      success: false,
      error: "Swallowing the error because we cant parse it",
    });
  }
}

export default withSession(handler);
