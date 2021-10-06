import { Fragment } from "react";
import { Button } from "../button/button";
import styles from "./service-cards.module.css";

export const ServiceCards = ({ service }) => {
  const showCommMatters =
    service.communicationMatters &&
    service.communicationMatters !== service.website;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Address</h2>
        <p className={styles.addressLines}>
          {service.addressLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
      <div className={styles.card}>
        <h2>Contact details</h2>
        <p>
          <strong>Phone:</strong> {service.phoneNumber}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${service.email}`} className={styles.emailLink}>
            {service.email}
          </a>
        </p>
        <div className={styles.visitWebsiteContainer}>
          <Button href={service.website}>Visit their website</Button>
        </div>
        {showCommMatters && (
          <a href={service.communicationMatters}>
            Check out their profile on Communication Matters &gt;
          </a>
        )}
      </div>
      <div className={styles.card}>
        <h2>Services offered</h2>
        {service.servicesOffered.map((type) => (
          <Fragment key={type.title}>
            <h3>{type.title}</h3>
            <p>{type.description}</p>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
