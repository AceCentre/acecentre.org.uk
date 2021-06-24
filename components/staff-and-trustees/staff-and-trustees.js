import styles from "./staff-and-trustees.module.css";

import { ImageWithLoader as Image } from "../image";
import { Button } from "../button/button";

export const StaffAndTrustees = () => {
  return (
    <div className={styles.container}>
      <div className={styles.peopleImage}>
        <div className={styles.background} />
        <Image
          alt="A group photo of Ace Centre staff"
          src="/group-photo.png"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.peopleDescription}>
        <h2>Our team</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <div className={styles.buttonContainer}>
          <Button href="/about/staff">Meet the team</Button>
        </div>
      </div>
      <div className={styles.trusteeImage}>
        <div className={styles.background} />
        <Image
          alt="A collage of head shots of trustees"
          src="/trustee-collage.png"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.trusteeDescription}>
        <h2>Our Trustees</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <div className={styles.buttonContainer}>
          <Button href="/about/trustees">Meet the trustees</Button>
        </div>
      </div>
    </div>
  );
};
