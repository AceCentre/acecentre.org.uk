import NextImage from "next/image";
import { cloudinaryLoader } from "../lib/cloudinary-loader";
import styles from "./image.module.css";

export const ImageWithLoader = ({ ...props }) => {
  return <NextImage {...props} loader={cloudinaryLoader} />;
};

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
export const ImageSelector = ({ placeOnTop, ...props }) => {
  // If we are on storybook we just use a normal image tag
  // Bear in mind that we will then do more optimizing for the
  // production build
  if (process.env.STORYBOOK) {
    return <img {...props} />;
  }

  return (
    <div className={`${placeOnTop ? "" : styles.imageContainer}`}>
      <ImageWithLoader {...props} />
    </div>
  );
};
