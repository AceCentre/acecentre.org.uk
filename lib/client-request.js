import { GraphQLClient } from "graphql-request";
import config from "./config";

const ENDPOINT = `${config.baseUrl}/graphql`;

import { refreshToken } from "./auth/refresh-token";

export const clientRequest = async (req, graphQlQuery, variables) => {
  // We always refresh the auth token so its valid
  await refreshToken(req);

  // Get the user and the cart from the session if the exist
  const user = req.session.get("user") || {};
  const cart = req.session.get("cart") || {};
  const authToken = user.authToken || null;
  const wooSession = cart.wooSessionToken || null;

  // Add the headers if they exist
  let headers = {};
  if (authToken) headers["authorization"] = `Bearer ${authToken}`;
  if (wooSession) headers["woocommerce-session"] = `Session ${wooSession}`;

  // Make the request to the WP backend
  const client = new GraphQLClient(ENDPOINT, {
    headers,
  });
  const { data: response, headers: responseHeaders } = await client.rawRequest(
    graphQlQuery,
    variables
  );

  // If the old woo session is different from the new one
  // then we will save the new one
  const newWooSession = responseHeaders.get("woocommerce-session");
  if (wooSession !== newWooSession) {
    req.session.set("cart", {
      ...cart,
      wooSessionToken: newWooSession,
    });
    await req.session.save();
  }

  return response;
};
