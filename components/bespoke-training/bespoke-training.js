import styles from "./bespoke-training.module.css";

import { Button } from "../button/button";
import { ImageWithLoader as Image } from "../image";

export const BespokeTraining = () => {
  return (
    <div className={styles.container}>
      <div>
        <h2>Bespoke training solutions</h2>
        <p>
          Our expert Ace Centre team can help to create a bespoke training
          solution for you. Click below to fill out our training enquiry form to
          see how we can develop a suitable training programme for your
          requirements.
        </p>
        <div className={styles.button}>
          <Button href="/learning/bespoke-training">
            Learn more about bespoke training
          </Button>
        </div>

        <p>
          or call our advice line on <strong>0800 080 3115</strong>
        </p>
      </div>
      <div className={styles.imageContainer}>
        <Image
          alt="People standing around a whiteboard getting trained"
          src="/bespoke-training.jpeg"
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.background} />
      </div>
    </div>
  );
};
