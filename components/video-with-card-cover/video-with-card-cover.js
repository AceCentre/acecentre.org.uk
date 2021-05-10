import styles from "./video-with-card-cover.module.css";

export const VideoWithCardCover = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.cardInnerContainer}>
          <div className={styles.card}>{children}</div>
        </div>
      </div>
    </div>
  );
};
