import { writeToStaticCache } from "./write";

beforeEach(() => jest.resetModules());

it("creates the folder if it doesn't exist", async () => {
  // Arrange
  const { default: redis } = require("./redis");
  const dataToCache = { myCacheData: true };
  const random = Math.floor(Math.random() * 99999);
  const cacheKey = "my-cache-" + random;

  // Act
  await writeToStaticCache(cacheKey, dataToCache, redis);

  // Assert
  const result = await redis.get("test-" + cacheKey);
  expect(JSON.parse(result)).toEqual(dataToCache);

  // Cleanup
  await redis.quit();
});
