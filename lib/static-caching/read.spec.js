import { readFromStaticCache } from "./read";

beforeEach(() => jest.resetModules());

it("returns null if there is nothing in the cache", async () => {
  // Arrange
  const { default: redis } = require("./redis");
  const random = Math.floor(Math.random() * 99999);
  const cacheKey = "my-cache-" + random;

  // Act
  const result = await readFromStaticCache(cacheKey, redis);

  // Assert
  expect(result).toBeNull();

  // Cleanup
  await redis.quit();
});

it("returns the JSON in the file", async () => {
  // Arrange
  const { default: redis } = require("./redis");
  const content = { "my-cache": "my-cache" };
  const random = Math.floor(Math.random() * 99999);
  const cacheKey = "my-cache-" + random;
  await redis.set("test-" + cacheKey, JSON.stringify(content), "EX", 60);

  // Act
  const result = await readFromStaticCache(cacheKey, redis);

  // Assert
  expect(result).toStrictEqual(content);

  // Cleanup
  await redis.quit();
});
