import styles from "./information-days.module.css";

import { Button } from "../button/button";
import { ImageWithLoader as Image } from "../image";

export const InformationDays = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="/information-days.jpg"
          alt="A client laughing"
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.right}>
        <h2>Information days</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className={styles.buttonContainer}>
          <Button className={styles.button} href="/information-days">
            Find out more
          </Button>
        </div>
      </div>
    </div>
  );
};
