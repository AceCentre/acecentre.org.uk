import { GraphQLClient } from "graphql-request";
import config from "./config";
import jwtDecode from "jwt-decode";

const ENDPOINT = `${config.baseUrl}/graphql`;

import { refreshToken } from "./auth/refresh-token";
import { GET_CART } from "./cart/get";

export const clientRequest = async (req, graphQlQuery, variables) => {
  // We always refresh the auth token so its valid
  // TODO Reduce calls to refresh auth token by checking expiry
  const result = await refreshToken(req);
  await refreshWooToken(req);

  // The refresh token has expired,
  // so we need the user to logout so we can get a new one.
  if (result && result.isRefreshTokenExpired) {
    req.session.destroy();
    return { loggedOut: true };
  }

  return makeRequest(req, graphQlQuery, variables);
};

const makeRequest = async (req, graphQlQuery, variables) => {
  // Get the user and the cart from the session if the exist
  const user = req.session.get("user") || {};
  const cart = req.session.get("cart") || {};
  const authToken = user.authToken || null;
  const wooSession = cart.wooSessionToken || null;

  // Add the headers if they exist
  let headers = {};
  if (authToken) headers["authorization"] = `Bearer ${authToken}`;
  if (wooSession) headers["woocommerce-session"] = `Session ${wooSession}`;
  if (req && req.socket && req.socket.remoteAddress) {
    headers["X-Forwarded-For"] = req.socket.remoteAddress;
  }

  if (req && req.headers && req.headers["client-ip"]) {
    headers["X-Forwarded-For"] = req.headers["client-ip"];
  }

  // Make the request to the WP backend
  const client = new GraphQLClient(ENDPOINT, {
    headers,
  });
  const rawResult = await client.rawRequest(graphQlQuery, variables);

  // console.log(JSON.stringify(rawResult, null, 2));

  const { data: response, headers: responseHeaders } = rawResult;

  // If the old woo session is different from the new one
  // then we will save the new one
  const newWooSession = responseHeaders.get("woocommerce-session");
  if (newWooSession && wooSession !== newWooSession) {
    req.session.set("cart", {
      ...cart,
      wooSessionToken: newWooSession,
    });
    await req.session.save();
  }

  return response;
};

// Refreshes the woo token if the current one is out of date
// There is no token validation, this happens by Wordpress
const refreshWooToken = async (req) => {
  const cart = req.session.get("cart") || {};

  if (!cart) return;
  if (!cart.wooSessionToken) return;

  let decoded = {};

  try {
    const token = cart.wooSessionToken;
    decoded = jwtDecode(token);
  } catch (e) {
    throw Error("You have an invalid session token");
  }

  const expirationDate = new Date(decoded.exp * 1000);
  const now = new Date();
  const isExpired = expirationDate < now;

  if (!isExpired) return;

  // If it is expired lets remove the current session token then ask for a new one
  req.session.set("cart", {
    ...cart,
    wooSessionToken: null,
  });
  await req.session.save();
  await makeRequest(req, GET_CART);
};
