import { gql, GraphQLClient } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import config from "../../../lib/config";

const ENDPOINT = `${config.baseUrl}/graphql`;

export const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
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
      headers["X-Forwarded-For"] = req.socket.remoteAddress;
    }

    if (req && req.headers && req.headers["client-ip"]) {
      headers["X-Forwarded-For"] = req.headers["client-ip"];
    }

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
