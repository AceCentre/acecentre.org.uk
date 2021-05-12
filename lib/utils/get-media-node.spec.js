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
  const result = getMediaNode(mediaNode);

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
  const result = getMediaNode(mediaNode);

  // Assert
  expect(result).toStrictEqual(expected);
});
