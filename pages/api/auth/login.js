import request, { gql } from "graphql-request";
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
    const queryResponse = await request(ENDPOINT, LOGIN_MUTATION, {
      username,
      password,
    });

    const user = {
      authToken: queryResponse.login.authToken,
      refreshToken: queryResponse.login.authToken,
      userId: queryResponse.login.user.id,
      customerId: queryResponse.login.customer.id,
    };

    req.session.set("user", user);

    await req.session.save();
    res.send({ success: true });
  } catch (error) {
    if (error.response && error.response.errors && error.response.errors) {
      const firstError = error.response.errors[0];
      return res.send({ success: false, error: firstError.message });
    }
    return res.send({ success: false, error });
  }
}

export default withSession(handler);
