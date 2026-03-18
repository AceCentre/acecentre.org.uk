export const getMediaNode = (mediaNode) => {
  if (!mediaNode) return null;
  if (!mediaNode.sourceUrl) return null;

  const width = mediaNode?.mediaDetails?.width;
  const height = mediaNode?.mediaDetails?.height;

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
