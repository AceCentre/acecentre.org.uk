import styles from "./aac-books-cta.module.css";

import { ImageWithLoader as Image } from "../image";
import { Button } from "../button/button";

export const AacBooksCta = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src="/aac-books.png" layout="fill" alt="" objectFit="cover" />
      </div>
      <div className={styles.rightHandSide}>
        <h2 className={styles.title}>Get started with AAC Books</h2>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className={styles.button}>
          <Button href="/resources/all?category=ebook">
            View the E-book series
          </Button>
        </div>
      </div>
    </div>
  );
};
