import styles from "./advice-line.module.css";

import { ImageWithLoader as Image } from "../image";

export const AdviceLine = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="/MaryB2.jpg"
          alt="Woman on the phone"
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.right}>
        <h2>Advice line</h2>
        <p>
          Call <strong>0800 080 3115</strong> (option 2)on Monday, Wednesday or
          Friday from 1-5PM to connect with a member of our clinical team. You
          can email us anytime at{" "}
          <a href="mailto:advice@acecentre.org.uk">advice@acecentre.org.uk</a>{" "}
          with your query and we&apos;ll try our best to reply within 48hrs.
        </p>
        <div className={styles.buttonContainer}>
          {/* <Button
            className={`${styles.button} ${nhs ? styles.nhs : ""}`}
            href="/information-appointments"
          >
            Call our advice line
          </Button> */}
        </div>
      </div>
    </div>
  );
};
