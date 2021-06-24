import Link from "next/link";
import styles from "./get-involved.module.css";
import { ImageWithLoader as Image } from "../image";
import { Button } from "../button/button";

export const GetInvolved = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.backgroundImage}
        src="/collage.png"
        objectFit="cover"
        layout="fill"
        alt="A collage of Ace Centre clients"
      />
      <div className={styles.blueCover}></div>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h2 className={styles.title}>How to get involved</h2>
          <p className={styles.handwriting}>Make a difference</p>
          <p className={styles.paragraph}>
            Your support is vital to our ongoing work to ensure that children
            and adults with the most challenging communication difficulties.
          </p>
          <div className={styles.buttonContainer}>
            <Button href="/get-involved">Ways to get involved</Button>
            <Link href="/donation">
              <a className={styles.donationLink}>Make a donation</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
