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
import { GET_CART } from "./cart/get";

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
  nock(config.baseUrl).post("/graphql").reply(200, handler);

  // Act
  await clientRequest({ session }, myGqlQuery);

  // Assert
  expect(handler).toHaveBeenCalled();
  expect(sentHeaders["authorization"]).toBeUndefined();
  expect(sentHeaders["woocommerce-session"]).toBeUndefined();
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
  nock(config.baseUrl).post("/graphql").reply(200, handler);

  // Act
  await clientRequest({ session }, myGqlQuery);

  // Assert
  expect(handler).toHaveBeenCalled();
  expect(sentHeaders["authorization"]).toStrictEqual([
    `Bearer ${usersAuthToken}`,
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
  await clientRequest({ session }, myGqlQuery);

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
  await clientRequest({ session }, myGqlQuery);

  // Assert
  expect(session.savedStore.cart.wooSessionToken).toBe(newSessionToken);
});

it("Requests a woo session token if the current one has expired", async () => {
  // Arrange
  // This is an expired woocommerce session
  const sessionToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaW50ZXJuYWwuYWNlY2VudHJlLm9yZy51ayIsImlhdCI6MTYxOTc5MTg2OSwibmJmIjoxNjE5NzkxODY5LCJleHAiOjE2MTk5NjQ2NjksImRhdGEiOnsiY3VzdG9tZXJfaWQiOiI1NjQwNTMxMzUxYjZkYWY5NGI0ODlmOTAwZThiMjBlNSJ9fQ.sm3ocKwaLF5CgCt3Xws9T2j1zzSOYR3x3Q5wIuotkfY";
  const newSessionToken = "test";
  const session = new MockSession({ cart: { wooSessionToken: sessionToken } });

  nock(config.baseUrl)
    .post("/graphql", ({ query }) => query === GET_CART)
    .reply(200, { data: {} }, { "woocommerce-session": newSessionToken });

  // Response for myGqlQuery, only responds when you use the new header
  nock(config.baseUrl)
    .matchHeader("woocommerce-session", newSessionToken)
    .post("/graphql", ({ query }) => query === myGqlQuery)
    .reply(200, { data: { test: true } });

  // Act
  const result = await clientRequest({ session }, myGqlQuery);

  // Assert
  expect(result).toEqual({ test: true });
  expect(session.savedStore.cart.wooSessionToken).toBe(newSessionToken);
});
