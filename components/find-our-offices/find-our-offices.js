import styles from "./find-our-offices.module.css";

import { ImageWithLoader as Image } from "../image";
import { Button } from "../button/button";

export const FindOurOffices = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Find our offices</h2>
      <ul className={styles.list}>
        <Card image="/north-office.png" office="north" map="/contact/oldham">
          <h3>North office</h3>
          <p>
            <span>Hollinwood Business Centre</span>
            <span>Albert Street Oldham</span>
            <span>OL8 3QL</span>
          </p>
        </Card>
        <Card image="/south-office.jpg" office="south" map="/contact/abingdon">
          <h3>South office</h3>
          <p>
            <span>5 Hitching Court</span>
            <span>Blacklands Way</span>
            <span>Abingdon Business Park</span>
            <span>Oxfordshire, OX14 1RG</span>
          </p>
        </Card>
      </ul>
    </div>
  );
};

const Card = ({ children, image, office, map }) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={`The ${office} office`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.addressContainer}>{children}</div>
        <div className={styles.buttonContainer}>
          <Button href={map}>More details</Button>
        </div>
      </div>
    </li>
  );
};
