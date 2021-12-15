import request, { gql } from "graphql-request";
import jwtDecode from "jwt-decode";
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

  let decoded = {};

  try {
    decoded = jwtDecode(refreshToken);
  } catch (e) {
    throw Error("You have an invalid refresh token");
  }

  const expirationDate = new Date(decoded.exp * 1000);
  const now = new Date();
  const isExpired = expirationDate < now;

  console.log(decoded, expirationDate, now, isExpired);

  if (isExpired) return { isRefreshTokenExpired: true };

  let response = await request(ENDPOINT, REFRESH_QUERY, { refreshToken });

  const authToken = response.refreshJwtAuthToken.authToken;
  req.session.set("user", { ...user, authToken });
  await req.session.save();
}
