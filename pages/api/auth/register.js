import { gql, GraphQLClient } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import config from "../../../lib/config";
import { LOGIN_MUTATION } from "./login";

const ENDPOINT = `${config.baseUrl}/graphql`;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS_PER_WINDOW = 5;
const MIN_FORM_FILL_TIME_MS = 3000;
const registrationAttempts = new Map();

const REGISTER_MUTATION = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    registerCustomer(
      input: { email: $email, password: $password, username: $email }
    ) {
      customer {
        id
      }
    }
  }
`;

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ success: false, errorMessage: "Method not allowed" });
    return;
  }

  if (process.env.DISABLE_PUBLIC_REGISTRATION === "true") {
    res.send({
      success: false,
      errorMessage:
        "New account registrations are temporarily disabled. Please contact us if you need access.",
    });
    return;
  }

  // get user from database then
  const body = req.body;
  const email = body?.email;
  const password = body?.password;
  const company = body?.company;
  const formStartedAt = Number(body?.formStartedAt || 0);
  const now = Date.now();

  if (company) {
    res.send({ success: false, errorMessage: "An error has occurred" });
    return;
  }

  if (!formStartedAt || now - formStartedAt < MIN_FORM_FILL_TIME_MS) {
    res.send({ success: false, errorMessage: "Please try again." });
    return;
  }

  if (!validateEmail(email)) {
    res.send({ success: false, errorMessage: "Email address is not valid" });
    return;
  }

  if (typeof password !== "string" || password.length < 8) {
    res.send({
      success: false,
      errorMessage: "Password must be 8+ characters",
    });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip, now)) {
    res.send({
      success: false,
      errorMessage:
        "Too many attempts from this IP address. Please try again later.",
    });
    return;
  }

  try {
    let headers = {};
    if (req && req.socket && req.socket.remoteAddress) {
      headers["X-Forwarded-For"] = req.socket.remoteAddress;
    }

    if (req && req.headers && req.headers["client-ip"]) {
      headers["X-Forwarded-For"] = req.headers["client-ip"];
    }

    if (process.env["WORDPRESS_DO_SHARED_SECRET"]) {
      headers["x-do-secret"] = process.env["WORDPRESS_DO_SHARED_SECRET"];
    }

    const client = new GraphQLClient(ENDPOINT, {
      headers,
    });

    await client.rawRequest(REGISTER_MUTATION, {
      email,
      password,
    });

    const { data: loginResponse } = await client.rawRequest(LOGIN_MUTATION, {
      username: email,
      password,
    });

    const user = {
      authToken: loginResponse.login.authToken,
      refreshToken: loginResponse.login.refreshToken,
      userId: loginResponse.login.user.id,
      customerId: loginResponse.login.customer.id,
      wooSessionToken: loginResponse.login.user.wooSessionToken,
      username: loginResponse.login.user.username,
    };

    req.session.set("user", user);
    // req.session.set("cart", {
    //   wooSessionToken: loginResponse.login.user.wooSessionToken,
    // });

    await req.session.save();

    res.send({ success: true });
  } catch (error) {
    console.log(error);

    const errors = error?.response?.errors || [];
    const mainError = errors[0] || null;
    const errorMessage = mainError?.message || "An error has occurred";

    res.send({ success: false, errorMessage: normaliseError(errorMessage) });
  }
}

const normaliseError = (errorMessage) => {
  if (errorMessage.includes("this username is already registered")) {
    return "This email is already in use";
  }

  if (errorMessage.includes("this email is already registered")) {
    return "This email is already in use";
  }

  if (
    errorMessage.includes(
      "An account is already registered with your email address"
    )
  ) {
    return "This email is already in use";
  }

  if (errorMessage.includes("An account is already registered with")) {
    return "This email is already in use";
  }

  return errorMessage;
};

export default withSession(handler);

function getClientIp(req) {
  const xForwardedFor = req?.headers?.["x-forwarded-for"];
  if (typeof xForwardedFor === "string" && xForwardedFor.length > 0) {
    return xForwardedFor.split(",")[0].trim();
  }

  if (Array.isArray(xForwardedFor) && xForwardedFor[0]) {
    return xForwardedFor[0];
  }

  if (req?.headers?.["client-ip"]) {
    return req.headers["client-ip"];
  }

  return req?.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip, now) {
  const existing = registrationAttempts.get(ip) || [];
  const recent = existing.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  registrationAttempts.set(ip, recent);

  return recent.length > MAX_ATTEMPTS_PER_WINDOW;
}

function validateEmail(email) {
  if (typeof email !== "string") return false;

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email.toLowerCase());
}
