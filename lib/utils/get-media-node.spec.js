const { getMediaNode } = require("./get-media-node");

it("returns null if there is no media node", () => {
  // Arrange
  const mediaNode = null;
  const expected = null;

  // Act
  const result = getMediaNode(mediaNode);

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns null if there is no mediaDetails", () => {
  // Arrange
  const mediaNode = { sourceUrl: "myurl" };
  const expected = null;

  // Act
  const result = getMediaNode(mediaNode);

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns null if there is no height", () => {
  // Arrange
  const mediaNode = {
    sourceUrl: "myurl",
    mediaDetails: {
      width: 100,
    },
  };
  const expected = null;

  // Act
  const result = getMediaNode(mediaNode);

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns an image if we have url, height and width", () => {
  // Arrange
  const mediaNode = {
    sourceUrl: "myurl",
    mediaDetails: {
      width: 100,
      height: 100,
    },
  };
  const expected = {
    src: "myurl",
    height: 100,
    width: 100,
  };

  // Act
  const result = getMediaNode(mediaNode, { warnIfNoAlt: false });

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns an image if we have url, height, width and alt", () => {
  // Arrange
  const mediaNode = {
    sourceUrl: "myurl",
    altText: "MyAltText",
    mediaDetails: {
      width: 100,
      height: 100,
    },
  };
  const expected = {
    src: "myurl",
    height: 100,
    width: 100,
    alt: "MyAltText",
  };

  // Act
  const result = getMediaNode(mediaNode, { warnIfNoAlt: false });

  // Assert
  expect(result).toStrictEqual(expected);
});

it("warns if you provide no alt text and enable warning", () => {
  // Arrange
  const mediaNode = {
    sourceUrl: "myurl",
    mediaDetails: {
      width: 100,
      height: 100,
    },
  };
  const expected = {
    src: "myurl",
    height: 100,
    width: 100,
  };
  const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

  // Act
  const result = getMediaNode(mediaNode, { warnIfNoAlt: true });

  // Assert
  expect(result).toStrictEqual(expected);
  expect(consoleSpy).toHaveBeenCalled();

  // Reset
  consoleSpy.mockRestore();
});

it("defaults to warning about no alt text", () => {
  // Arrange
  const mediaNode = {
    sourceUrl: "myurl",
    mediaDetails: {
      width: 100,
      height: 100,
    },
  };
  const expected = {
    src: "myurl",
    height: 100,
    width: 100,
  };
  const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

  // Act
  const result = getMediaNode(mediaNode);

  // Assert
  expect(result).toStrictEqual(expected);
  expect(consoleSpy).toHaveBeenCalled();

  // Reset
  consoleSpy.mockRestore();
});
