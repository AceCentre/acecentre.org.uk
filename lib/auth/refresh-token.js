import request, { gql } from "graphql-request";
import config from "../config";

const ENDPOINT = `${config.baseUrl}/graphql`;

const REFRESH_QUERY = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshJwtAuthToken(input: { jwtRefreshToken: $refreshToken }) {
      authToken
    }
  }
`;

export async function refreshToken(req) {
  const user = req.session.get("user");

  if (!user) return;
  if (!user.refreshToken) return;

  const refreshToken = user.refreshToken;

  const response = await request(ENDPOINT, REFRESH_QUERY, { refreshToken });
  const authToken = response.refreshJwtAuthToken.authToken;
  req.session.set("user", { ...user, authToken });
  await req.session.save();
}
