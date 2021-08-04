import { gql, GraphQLClient } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import config from "../../../lib/config";

const ENDPOINT = `${config.baseUrl}/graphql`;

const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      refreshToken
      user {
        id
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

  try {
    let headers = {};

    if (req.socket.remoteAddress)
      headers["X-Forwarded-For"] = req.socket.remoteAddress;

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
      customerId: queryResponse.login.customer.id,
      wooSessionToken: queryResponse.login.user.wooSessionToken,
    };

    req.session.set("user", user);
    req.session.set("cart", {
      wooSessionToken: queryResponse.login.user.wooSessionToken,
    });

    await req.session.save();
    res.send({ success: true });
  } catch (error) {
    if (error.response && error.response.errors && error.response.errors) {
      const firstError = error.response.errors[0];
      return res.send({
        success: false,
        error: firstError.message,
        rawError: error,
        rawErrorString: JSON.stringify(error, null, 2),
      });
    }
    return res.send({
      success: false,
      error,
      rawError: error.toString(),
      rawErrorString: JSON.stringify(error, null, 2),
      req: JSON.stringify(req),
    });
  }
}

export default withSession(handler);
