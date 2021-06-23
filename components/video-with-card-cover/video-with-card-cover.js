import styles from "./video-with-card-cover.module.css";
import Image from "next/image";

export const VideoWithCardCover = ({ children, src = "/about-cover.jpeg" }) => {
  return (
    <div className={styles.container}>
      <div className={styles.coverImageContainer}>
        <Image src={src} layout="fill" objectFit="cover" objectPosition="top" />
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
