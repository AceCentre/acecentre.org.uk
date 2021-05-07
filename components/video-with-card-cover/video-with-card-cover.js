import Link from "next/link";
import { ImageSelector } from "../image";

import styles from "./video-with-card-cover.module.css";

export const VideoWithCardCover = () => {
  return (
    <>
      <div className={styles.imageContainer}>
        <ImageSelector height="400px" width="100%" src="/placeholder.jpeg" />
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardInnerContainer}>
          <div className={styles.card}>
            <p>
              Working with people of all ages to overcome communication
              challenges
            </p>
            <Link href="/about">Learn about us</Link>
          </div>
        </div>
      </div>
    </>
  );
};
