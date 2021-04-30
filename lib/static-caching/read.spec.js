import { readFromStaticCache } from "./read";
import mock from "mock-fs";

afterEach(() => {
  mock.restore();
});

it("returns null if there is nothing in the cache", () => {
  // Arrange
  mock({
    ".static-cache": {
      "some-file.txt": "file content here",
    },
  });

  // Act
  const result = readFromStaticCache("my-cache");

  // Assert
  expect(result).toBeNull();
});

it("returns the JSON in the file", () => {
  // Arrange
  const content = { "my-cache": "my-cache" };
  mock({
    ".static-cache": {
      "my-cache.json": JSON.stringify(content),
    },
  });

  // Act
  const result = readFromStaticCache("my-cache");

  // Assert
  expect(result).toStrictEqual({ "my-cache": "my-cache" });
});

it("throws an error if there is any error reading the cache", () => {
  // Arrange
  const content = { "my-cache": "my-cache" };
  mock({
    ".static-cache": {
      "my-cache.json": mock.file({
        content: JSON.stringify(content),
        // Cant read a file without permissions
        mode: 0,
      }),
    },
  });

  // Act and Assert
  expect(() => readFromStaticCache("my-cache")).toThrow();
});
