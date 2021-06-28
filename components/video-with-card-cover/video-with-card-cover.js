import styles from "./video-with-card-cover.module.css";
import { ImageWithLoader as Image } from "../image";

export const VideoWithCardCover = ({
  children,
  src = "/about-cover.jpeg",
  alt = "cover photo of client and clinician using AAC",
  objectPosition = "top",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.coverImageContainer}>
        <Image
          src={src}
          layout="fill"
          objectFit="cover"
          objectPosition={objectPosition}
          alt={alt}
        />
        <div className={styles.backgroundGradient} />
        <div className={styles.fullContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.card}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
