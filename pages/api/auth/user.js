import request, { gql, GraphQLClient } from "graphql-request";
import config from "../../../lib/config";
import withSession from "../../../lib/auth/with-session";

const ENDPOINT = `${config.baseUrl}/graphql`;

const REFRESH_QUERY = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshJwtAuthToken(input: { jwtRefreshToken: $refreshToken }) {
      authToken
    }
  }
`;

const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId, idType: ID) {
      name
      lastName
      nicename
      nickname
      id
      email
    }
  }
`;

async function refreshToken(req) {
  const user = req.session.get("user");

  if (!user) return;
  if (!user.refreshToken) return;

  const refreshToken = user.refreshToken;

  try {
    const response = await request(ENDPOINT, REFRESH_QUERY, { refreshToken });
    const authToken = response.refreshJwtAuthToken.authToken;
    req.session.set("user", { ...user, authToken });
    await req.session.save();

    // If this fails we just fail silently
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

async function handler(req, res) {
  await refreshToken(req);

  const user = req.session.get("user");

  const client = new GraphQLClient(ENDPOINT, {
    headers: {
      authorization: `Bearer ${user.authToken}`,
    },
  });

  try {
    const response = await client.request(GET_USER, {
      userId: user.userId,
    });

    res.send({ user: response.user });
  } catch (error) {
    return res.send({ error });
  }
}

export default withSession(handler);
