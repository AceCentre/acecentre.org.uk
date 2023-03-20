import styles from "./information-days.module.css";

import { Button } from "../button/button";
import { ImageWithLoader as Image } from "../image";

export const InformationDays = ({ nhs = false }) => {
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
        <h2>Information appointments</h2>
        <p>Meet with our team to discuss your AAC/AT needs</p>
        <div className={styles.buttonContainer}>
          <Button
            className={`${styles.button} ${nhs ? styles.nhs : ""}`}
            href="/information-appointments"
          >
            Book an information appointment
          </Button>
        </div>
      </div>
    </div>
  );
};
