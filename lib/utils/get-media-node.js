export const getMediaNode = (mediaNode) => {
  if (!mediaNode) return null;
  if (!mediaNode.mediaDetails) return null;
  if (!mediaNode.mediaDetails.width) return null;
  if (!mediaNode.mediaDetails.height) return null;
  if (!mediaNode.sourceUrl) return null;

  return {
    src: mediaNode.sourceUrl,
    height: mediaNode.mediaDetails.height,
    width: mediaNode.mediaDetails.width,

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
