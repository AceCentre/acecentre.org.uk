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

const myGqlQuery = gql`
  query MyQuery {
    myDataPlease {
      data
    }
  }
`;

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
  const sessionToken = "my-session-token";
  const session = new MockSession({ cart: { wooSessionToken: sessionToken } });
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
    `Session ${sessionToken}`,
  ]);
});

it("Replaces the session token if we are given a new one", async () => {
  // Arrange
  const sessionToken = "my-session-token";
  const newSessionToken = "test";
  const session = new MockSession({ cart: { wooSessionToken: sessionToken } });
  nock(config.baseUrl)
    .post("/graphql")
    .reply(200, { data: {} }, { "woocommerce-session": newSessionToken });

  // Act
  await clientRequest({ session }, myGqlQuery);

  // Assert
  expect(session.savedStore.cart.wooSessionToken).toBe(newSessionToken);
});
