import styles from "./research-cta.module.css";
import { ImageWithLoader as Image } from "../image";
import { Button } from "../button/button";

export const ResearchCta = () => {
  return (
    <div className={styles.container}>
      <div className={styles.researchImage}>
        <Image
          src="/research.jpeg"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          alt="Person laughing while using AAC"
        />
        <div className={styles.blueBackground}></div>
      </div>
      <div className={styles.researchDescription}>
        <h2>Our dedication to research</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className={styles.resourcesImage}>
        <Image
          src="/our-resources.png"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          alt="Gear, calendar and file icons"
        />
      </div>
      <div className={styles.resourcesDescription}>
        <h2>Our resources</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className={styles.buttonContainer}>
          <Button href="/resources">View resources</Button>
        </div>
      </div>
    </div>
  );
};
