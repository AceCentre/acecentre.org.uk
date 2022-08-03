import nock from "nock";
import { refreshToken } from "./refresh-token";
import config from "../config";
import MockSession from "../utils/mock-session";

afterEach(() => {
  nock.cleanAll();
});

it("doesn't make a request if there is no refresh token", async () => {
  // Arrange
  const handler = jest.fn();
  nock(config.baseUrl).post("/graphql").reply(200, handler);
  const session = new MockSession({
    user: null,
  });

  // Act
  await refreshToken({ session });

  // Assert
  expect(handler).not.toHaveBeenCalled();
});

it("requests an auth token if we have a refresh token", async () => {
  // Arrange
  const handler = jest.fn(() => ({
    data: { refreshJwtAuthToken: { authToken: "test" } },
  }));
  nock(config.baseUrl).post("/graphql").reply(200, handler);
  const session = new MockSession({
    user: {
      refreshToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ludGVybmFsLmFjZWNlbnRyZS5vcmcudWsiLCJpYXQiOjE2Mjc2NDQyNTUsIm5iZiI6MTYyNzY0NDI1NSwiZXhwIjoyNjU5MTgwMjU1LCJkYXRhIjp7fX0.qlHjF6IfQw5B4vuYsG-M2N-hnjATW7EHu-z2QVKQCtA",
    },
  });

  // Act
  await refreshToken({ session });

  // Assert
  expect(handler).toHaveBeenCalled();
});

it("saves the new auth token", async () => {
  // Arrange
  const newAuthToken = "newAuthToken";
  nock(config.baseUrl)
    .post("/graphql")
    .reply(200, {
      data: { refreshJwtAuthToken: { authToken: newAuthToken } },
    });
  const session = new MockSession({
    user: {
      refreshToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ludGVybmFsLmFjZWNlbnRyZS5vcmcudWsiLCJpYXQiOjE2Mjc2NDQyNTUsIm5iZiI6MTYyNzY0NDI1NSwiZXhwIjoyNjU5MTgwMjU1LCJkYXRhIjp7fX0.qlHjF6IfQw5B4vuYsG-M2N-hnjATW7EHu-z2QVKQCtA",
    },
  });

  // Act
  await refreshToken({ session });

  // Assert
  expect(session.savedStore.user.authToken).toBe(newAuthToken);
});
