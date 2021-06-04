const script = require("./calculate-deploy-key");

it("removes slashes", () => {
  // Arrange
  const context = { payload: { pull_request: { title: "title/with/slash" } } };
  const expected = "title-with-slash";

  // Act
  const result = script(context);

  // Assert
  expect(result).toBe(expected);
});

it("removes dots", () => {
  // Arrange
  const context = { payload: { pull_request: { title: "title.with.dot" } } };
  const expected = "title-with-dot";

  // Act
  const result = script(context);

  // Assert
  expect(result).toBe(expected);
});

it("removes spaces", () => {
  // Arrange
  const context = { payload: { pull_request: { title: "title with space" } } };
  const expected = "title-with-space";

  // Act
  const result = script(context);

  // Assert
  expect(result).toBe(expected);
});

it("trims long string", () => {
  // Arrange
  const context = {
    payload: {
      pull_request: { title: "titlewithreallyreallylongnamethatneedstrimmed" },
    },
  };
  const expected = "titlewithreallyreallylongnamethatne";

  // Act
  const result = script(context);

  // Assert
  expect(result).toBe(expected);
});

it("lower cases string", () => {
  // Arrange
  const context = {
    payload: {
      pull_request: { title: "UPPER" },
    },
  };
  const expected = "upper";

  // Act
  const result = script(context);

  // Assert
  expect(result).toBe(expected);
});

it("Removes trailing dashes", () => {
  // Arrange
  const context = {
    payload: {
      pull_request: { title: "Update dependency @lhci/cli to v0.8.0" },
    },
  };
  const expected = "update-dependency-lhci-cli-to-v0-8";

  // Act
  const result = script(context);

  // Assert
  expect(result).toBe(expected);
});
