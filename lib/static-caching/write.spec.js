import { writeToStaticCache } from "./write";
import fs from "fs";
import mock from "mock-fs";

afterEach(() => {
  mock.restore();
});

it("creates the folder if it doesn't exist", () => {
  // Arrange
  mock({});
  const dataToCache = { myCacheData: true };

  // Act
  writeToStaticCache("my-cache", dataToCache);

  // Assert
  const doesCacheExist = fs.existsSync(".static-cache");
  expect(doesCacheExist).toBeTruthy();
});

it("creates file if it doesn't exist", () => {
  // Arrange
  mock({});
  const dataToCache = { myCacheData: true };

  // Act
  writeToStaticCache("my-cache", dataToCache);

  // Assert
  const doesCacheExist = fs
    .readFileSync(".static-cache/my-cache.json")
    .toString();
  expect(doesCacheExist).toEqual(JSON.stringify(dataToCache));
});
