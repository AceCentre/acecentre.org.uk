import styles from "./information-days.module.css";

import { Button } from "../button/button";
import { ImageWithLoader as Image } from "../image";

export const InformationDays = ({
  nhs = false,
  imageSrc = "/information-days.jpg",
  imageAlt = "A client laughing",
  title = "Information appointments",
  description = "Meet with our team to discuss your AAC/AT needs",
  buttonText = "Book an information appointment",
  buttonHref = "/information-appointments",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={imageSrc} alt={imageAlt} layout="fill" objectFit="cover" />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.right}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.buttonContainer}>
          <Button
            className={`${styles.button} ${nhs ? styles.nhs : ""}`}
            href={buttonHref}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
