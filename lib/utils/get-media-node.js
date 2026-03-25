export const getMediaNode = (mediaNode, options = {}) => {
  const { allowMissingDimensions = false } = options;

  if (!mediaNode) return null;
  if (!mediaNode.sourceUrl) return null;

  const width = mediaNode?.mediaDetails?.width;
  const height = mediaNode?.mediaDetails?.height;

  // Default behaviour: only return an image when we have enough data
  // (matches existing unit tests and gallery filtering logic).
  if (!allowMissingDimensions) {
    if (!mediaNode.mediaDetails) return null;
    if (!mediaNode.mediaDetails.width) return null;
    if (!mediaNode.mediaDetails.height) return null;
  }

  return {
    src: mediaNode.sourceUrl,
    ...(typeof width === "number" ? { width } : {}),
    ...(typeof height === "number" ? { height } : {}),
    ...getAltTag(mediaNode),
  };
};

const getAltTag = (mediaNode) => {
  // Returning empty object so we can spread it
  if (!mediaNode.altText) {
    return {};
  }

  return { alt: mediaNode.altText };
};
