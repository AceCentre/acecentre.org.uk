import styles from "./aac-books-cta.module.css";

import { ImageWithLoader as Image } from "../image";
import { Button } from "../button/button";

export const AacBooksCta = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="/getting-started-ebooks.svg"
          layout="fill"
          alt="Illustrations of individuals reading books on tablets"
          objectFit="cover"
        />
      </div>
      <div className={styles.rightHandSide}>
        <h2 className={styles.title}>Get started with AAC Books</h2>
        <p className={styles.description}>
          Four books have been designed to help families and professionals alike
          to get started with Augmentative and Alternative Communication (AAC).
          These have been edited by the Ace Centre, a UK charity providing
          information, advice and support for individuals who require technology
          to communicate.
        </p>
        <div className={styles.button}>
          <Button href="resources/all?category=made-by-ace&subcategory=e-books">
            View the E-book series
          </Button>
        </div>
      </div>
    </div>
  );
};
