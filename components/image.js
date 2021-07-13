import NextImage from "next/image";
import { cropToSquareLoader, imageKitLoader } from "../lib/cloudinary-loader";
import styles from "./image.module.css";

export const ImageWithLoader = ({ loader = imageKitLoader, ...props }) => {
  return <NextImage {...props} loader={loader} />;
};

export const CropToSquareAroundFace = ({ ...props }) => {
  return <NextImage {...props} loader={cropToSquareLoader} />;
};

export const Image = ({
  width,
  height,
  maxWidth,
  maxHeight,
  loader = imageKitLoader,
  ...rest
}) => {
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

  return (
    <ImageSelector
      loader={loader}
      height={newHeight}
      width={newWidth}
      {...rest}
    />
  );
};
export const ImageSelector = ({
  placeOnTop,
  loader = imageKitLoader,
  ...props
}) => {
  // If we are on storybook we just use a normal image tag
  // Bear in mind that we will then do more optimizing for the
  // production build
  if (process.env.STORYBOOK) {
    return <img {...props} />;
  }

  return (
    <div className={`${placeOnTop ? "" : styles.imageContainer}`}>
      <ImageWithLoader loader={loader} {...props} />
    </div>
  );
};
