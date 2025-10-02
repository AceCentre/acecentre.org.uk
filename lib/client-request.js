import { GraphQLClient } from "graphql-request";
import config from "./config";
import { refreshToken } from "./auth/refresh-token";

const ENDPOINT = `${config.baseUrl}/graphql`;

// REST-based session sanity check that avoids early GraphQL
const WOO_API_BASE = `${config.baseUrl}/wp-json/wc/store`;

// WooGraphQL session token retrieval following their documentation
export const getWooGraphQLSessionToken = async (req) => {
  try {
    const user = req.session.get("user") || {};
    const authToken = user.authToken || null;

    // Build headers for the session token request
    let headers = {};
    if (authToken) headers["authorization"] = `Bearer ${authToken}`;
    if (req?.socket?.remoteAddress) {
      headers["X-Forwarded-For"] = req.socket.remoteAddress;
    }
    if (req?.headers?.["client-ip"]) {
      headers["X-Forwarded-For"] = req.headers["client-ip"];
    }
    if (process.env["WORDPRESS_DO_SHARED_SECRET"]) {
      headers["x-do-secret"] = process.env["WORDPRESS_DO_SHARED_SECRET"];
    }

    // Query customer for session token (following WooGraphQL docs)
    const client = new GraphQLClient(ENDPOINT, { headers });
    const sessionQuery = `
      query {
        customer {
          sessionToken
        }
      }
    `;

    const result = await client.request(sessionQuery);
    const sessionToken = result?.customer?.sessionToken;

    if (sessionToken) {
      // Store the session token in the session
      const cart = req.session.get("cart") || {};
      req.session.set("cart", {
        ...cart,
        wooSessionToken: sessionToken,
      });
      await req.session.save();

      return { valid: true, sessionToken };
    }

    return { valid: false, reason: "No session token returned" };
  } catch (err) {
    console.error("getWooGraphQLSessionToken failed:", err);
    return { valid: false, reason: "GraphQL error" };
  }
};

export const refreshWooToken = async (req) => {
  try {
    const cookieHeader = req?.headers?.cookie || "";

    // If no Woo session cookie present, just skip (we rely on header token too)
    if (!cookieHeader.includes("wp_woocommerce_session")) {
      return { valid: false, reason: "No Woo session cookie" };
    }

    const res = await fetch(`${WOO_API_BASE}/cart`, {
      method: "GET",
      headers: { cookie: cookieHeader },
    });

    if (!res.ok) {
      return { valid: false, reason: `Woo API returned ${res.status}` };
    }

    const data = await res.json();
    return { valid: true, cart: data };
  } catch (err) {
    console.error("refreshWooToken failed:", err);
    return { valid: false, reason: "Network or API error" };
  }
};

export const clientRequest = async (req, graphQlQuery, variables) => {
  // Always refresh the WP auth token first
  const result = await refreshToken(req);

  // If WP refresh token expired, force logout
  if (result && result.isRefreshTokenExpired) {
    req.session.destroy();
    return { loggedOut: true };
  }

  // Get WooGraphQL session token if we don't have one
  const cart = req.session.get("cart") || {};
  if (!cart.wooSessionToken) {
    await getWooGraphQLSessionToken(req);
  }

  return makeRequest(req, graphQlQuery, variables);
};

const makeRequest = async (req, graphQlQuery, variables) => {
  const user = req.session.get("user") || {};
  const cart = req.session.get("cart") || {};
  const authToken = user.authToken || null;
  const wooSession = cart.wooSessionToken || null;

  // Build request headers
  let headers = {};
  if (authToken) headers["authorization"] = `Bearer ${authToken}`;
  if (wooSession) headers["woocommerce-session"] = `Session ${wooSession}`;
  if (req?.socket?.remoteAddress) {
    headers["X-Forwarded-For"] = req.socket.remoteAddress;
  }
  if (req?.headers?.["client-ip"]) {
    headers["X-Forwarded-For"] = req.headers["client-ip"];
  }
  if (process.env["WORDPRESS_DO_SHARED_SECRET"]) {
    headers["x-do-secret"] = process.env["WORDPRESS_DO_SHARED_SECRET"];
  }

  try {
    // Send GraphQL request
    const client = new GraphQLClient(ENDPOINT, { headers });
    const rawResult = await client.rawRequest(graphQlQuery, variables);

    const { data: response, headers: responseHeaders } = rawResult;

    // Persist updated Woo session token if present
    const newWooSession = responseHeaders.get("woocommerce-session");
    if (newWooSession && wooSession !== newWooSession) {
      req.session.set("cart", {
        ...cart,
        wooSessionToken: newWooSession,
      });
      await req.session.save();
    }

    return response;
  } catch (error) {
    // Handle invalid session token errors (following WooGraphQL docs)
    const targetErrors = [
      "The iss do not match with this server",
      "invalid-secret-key | Expired token",
      "invalid-secret-key | Signature verification failed",
      "Expired token",
      "Wrong number of segments",
    ];

    const errorMessage =
      error?.response?.errors?.[0]?.message || error?.message || "";

    if (
      targetErrors.some((targetError) => errorMessage.includes(targetError))
    ) {
      console.log("Invalid session token detected, fetching new one...");

      // Clear the invalid session token
      req.session.set("cart", {
        ...cart,
        wooSessionToken: null,
      });
      await req.session.save();

      // Get a new session token
      const newSessionResult = await getWooGraphQLSessionToken(req);

      if (newSessionResult.valid) {
        // Retry the request with the new session token
        return makeRequest(req, graphQlQuery, variables);
      }
    }

    // Re-throw the error if it's not a session token issue
    throw error;
  }
};
