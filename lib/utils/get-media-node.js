import config from "../config";

export const getMediaNode = (mediaNode, options = {}) => {
  const warnIfNoAlt = options.warnIfNoAlt ?? true;

  if (!mediaNode) return null;
  if (!mediaNode.mediaDetails) return null;
  if (!mediaNode.mediaDetails.width) return null;
  if (!mediaNode.mediaDetails.height) return null;
  if (!mediaNode.sourceUrl) return null;

  return {
    src: mediaNode.sourceUrl,
    height: mediaNode.mediaDetails.height,
    width: mediaNode.mediaDetails.width,

    ...getAltTag(mediaNode, warnIfNoAlt),
  };
};

const getAltTag = (mediaNode, warnIfNoAlt) => {
  if (!mediaNode.altText && warnIfNoAlt && !config.ignoreAltWarning) {
    console.warn(
      "You have not provided an alt tag for image: ",
      mediaNode.sourceUrl
    );
  }

  // Returning empty object so we can spread it
  if (!mediaNode.altText) {
    return {};
  }

  return { alt: mediaNode.altText };
};
