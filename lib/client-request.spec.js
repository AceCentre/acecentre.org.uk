// Mocking refresh token code because its tested elsewhere
jest.mock("./auth/refresh-token", () => {
  return {
    refreshToken: async () => {},
  };
});

import { clientRequest } from "./client-request";
import MockSession from "./utils/mock-session";
import nock from "nock";
import { gql } from "graphql-request";
import config from "./config";
// We no longer import GET_CART; the client refreshes session via customer.sessionToken

const myGqlQuery = gql`
  query MyQuery {
    myDataPlease {
      data
    }
  }
`;

// This token doesnt expire until 2100 so will not trigger a refetch
const NEVER_EXPIRES_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ludGVybmFsLmFjZWNlbnRyZS5vcmcudWsiLCJpYXQiOjE2MTk3OTE4NjksIm5iZiI6MTYxOTc5MTg2OSwiZXhwIjo0MTE2NzY4MzU2LCJkYXRhIjp7ImN1c3RvbWVyX2lkIjoiNTY0MDUzMTM1MWI2ZGFmOTRiNDg5ZjkwMGU4YjIwZTUifX0.llx9qPsQ0o1akpKQsAQrX8NPVaCKCBWqWNNEE4y8FbQ";

afterEach(() => {
  nock.cleanAll();
});

it("adds no extra headers if there is no session", async () => {
  // Arrange
  const session = new MockSession();
  let sentHeaders = {};
  const handler = jest.fn(function () {
    sentHeaders = this.req.headers;

    return { data: {} };
  });
  // First call to fetch woo session token
  nock(config.baseUrl)
    .post("/graphql")
    .reply(200, { data: { customer: { sessionToken: "new-session" } } });
  // Subsequent call for the actual query
  nock(config.baseUrl)
    .matchHeader("woocommerce-session", `Session new-session`)
    .post("/graphql")
    .reply(200, handler);

  // Act
  await clientRequest(
    { session, socket: { remoteAddress: "192.0.0.1" } },
    myGqlQuery
  );

  // Assert
  expect(handler).toHaveBeenCalled();
  expect(sentHeaders["x-forwarded-for"]).toEqual(["192.0.0.1"]);
  expect(sentHeaders["authorization"]).toBeUndefined();
  expect(sentHeaders["woocommerce-session"]).toStrictEqual([
    "Session new-session",
  ]);
});

it("Sends an auth header if the user has one", async () => {
  // Arrange
  const usersAuthToken = "my-auth-token";
  const session = new MockSession({ user: { authToken: usersAuthToken } });
  let sentHeaders = {};
  const handler = jest.fn(function () {
    sentHeaders = this.req.headers;

    return { data: {} };
  });
  // First call to fetch woo session token
  nock(config.baseUrl)
    .post("/graphql")
    .reply(200, { data: { customer: { sessionToken: "new-session" } } });
  // Subsequent call for the actual query
  nock(config.baseUrl)
    .matchHeader("woocommerce-session", `Session new-session`)
    .post("/graphql")
    .reply(200, handler);

  // Act
  await clientRequest(
    { session, socket: { remoteAddress: "192.0.0.1" } },
    myGqlQuery
  );

  // Assert
  expect(handler).toHaveBeenCalled();
  expect(sentHeaders["authorization"]).toStrictEqual([
    `Bearer ${usersAuthToken}`,
  ]);
  expect(sentHeaders["woocommerce-session"]).toStrictEqual([
    "Session new-session",
  ]);
});

it("Sends a woocommerce header if the cart has one", async () => {
  // Arrange
  const session = new MockSession({
    cart: { wooSessionToken: NEVER_EXPIRES_TOKEN },
  });
  let sentHeaders = {};
  const handler = jest.fn(function () {
    sentHeaders = this.req.headers;

    return { data: {} };
  });
  nock(config.baseUrl).post("/graphql").reply(200, handler);

  // Act
  await clientRequest(
    { session, socket: { remoteAddress: "192.0.0.1" } },
    myGqlQuery
  );

  // Assert
  expect(handler).toHaveBeenCalled();
  expect(sentHeaders["woocommerce-session"]).toStrictEqual([
    `Session ${NEVER_EXPIRES_TOKEN}`,
  ]);
});

it("Replaces the session token if we are given a new one", async () => {
  // Arrange
  const newSessionToken = "test";
  const session = new MockSession({
    cart: { wooSessionToken: NEVER_EXPIRES_TOKEN },
  });
  nock(config.baseUrl)
    .post("/graphql")
    .reply(200, { data: {} }, { "woocommerce-session": newSessionToken });

  // Act
  await clientRequest(
    { session, socket: { remoteAddress: "192.0.0.1" } },
    myGqlQuery
  );

  // Assert
  expect(session.savedStore.cart.wooSessionToken).toBe(newSessionToken);
});

it("Requests a woo session token via customer.sessionToken when needed", async () => {
  const session = new MockSession();

  // First request fetches session token from customer.sessionToken
  nock(config.baseUrl)
    .post("/graphql")
    .reply(200, { data: { customer: { sessionToken: "new-session" } } });

  // Subsequent request uses the new header
  nock(config.baseUrl)
    .matchHeader("woocommerce-session", `Session new-session`)
    .post("/graphql")
    .reply(200, { data: { ok: true } });

  const result = await clientRequest(
    { session, socket: { remoteAddress: "192.0.0.1" } },
    myGqlQuery
  );

  expect(result).toEqual({ ok: true });
  expect(session.savedStore.cart.wooSessionToken).toBe("new-session");
});
