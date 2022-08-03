import WarningIcon from "@material-ui/icons/Warning";
import { Fragment } from "react";
import { Button } from "../button/button";
import styles from "./service-cards.module.css";

export const ImportantCallout = () => {
  return (
    <div className={styles.fullContainer}>
      <div className={`${styles.card} ${styles.warning}`}>
        <WarningIcon className={styles.icon} />
        <p>
          <strong>
            Ace Centre does not run this service, this page is part of a
            directory of NHS services. To contact this service provider please
            use the contact details in the box below. Do not contact Ace Centre
            directly.
          </strong>
        </p>
      </div>
    </div>
  );
};

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
