import styles from "./certificate.module.css";

import { Image } from "../image";

export const Certificate = () => {
  return (
    <div className={styles.container}>
      <p className={styles.para}>
        You can earn an <strong>Ace Centre Learning certificate</strong> when
        you complete any of our courses.
      </p>
      <div className={styles.imageContainer}>
        <Image
          maxWidth={400}
          width={3508}
          height={2481}
          alt="A certificate of attendance"
          src="/example-certificate.jpeg"
        />
      </div>
    </div>
  );
};
