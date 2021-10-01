import styles from "./video-with-card-cover.module.css";
import { ImageWithLoader as Image } from "../image";

export const VideoWithCardCover = ({
  children,
  src = "/about-cover.jpeg",
  alt = "cover photo of client and clinician using AAC",
  objectPosition = "top",
  nhs = false,
  imageClassName = "",
  heightClass = "",
  coverImageContainerClassName = "",
  enableOverlay = true,
}) => {
  return (
    <>
      <style jsx>{`
        .cardColor {
          background: ${nhs ? "#005EB8" : "#bfdded"};
        }
      `}</style>
      <div className={`${styles.container} ${heightClass}`}>
        <div
          className={`${styles.coverImageContainer} ${coverImageContainerClassName}`}
        >
          <Image
            src={src}
            layout="fill"
            objectFit="cover"
            objectPosition={objectPosition}
            alt={alt}
            className={imageClassName}
          />
          {enableOverlay && <div className={styles.backgroundGradient} />}
          <div className={`${styles.fullContainer} ${heightClass}`}>
            <div className={styles.innerContainer}>
              <div className={`${styles.card} cardColor`}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
