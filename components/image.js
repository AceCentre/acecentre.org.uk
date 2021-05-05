import NextImage from "next/image";

export const Image = ({ width, height, maxWidth, maxHeight, ...rest }) => {
  // If you don't give a maxHeight or maxWidth we just use the normal width
  if (!maxHeight && !maxWidth) {
    console.warn("You haven't provided a maxHeight or maxWidth for your image");

    return <ImageSelector width={width} height={height} {...rest} />;
  }

  // const aspectRatio = width / height;
  const widthScale = maxWidth / width;
  const heightScale = maxHeight / height;

  const validScales = [widthScale, heightScale].filter((x) => !isNaN(x));

  const targetScale = Math.max(validScales);

  const newWidth = Math.ceil(width * targetScale);
  const newHeight = Math.ceil(height * targetScale);

  return <ImageSelector height={newHeight} width={newWidth} {...rest} />;
};

const ImageSelector = (props) => {
  // If we are on storybook we just use a normal image tag
  // Bear in mind that we will then do more optimizing for the
  // production build
  if (process.env.STORYBOOK) {
    return <img {...props} />;
  }

  return <NextImage {...props} />;
};
