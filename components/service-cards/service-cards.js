import WarningIcon from "@mui/icons-material/Warning";
import { Fragment } from "react";
import { Button } from "../button/button";
import styles from "./service-cards.module.css";

const parseEmails = (email) => {
  if (!email) return [];

  return email
    .split(/[,\n;]+/)
    .map((value) => value.replace(/^mailto:/i, "").trim())
    .filter(Boolean);
};

/** Turn bare domains like www.example.nhs.uk into absolute URLs. */
export const toAbsoluteExternalUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();
  if (!trimmed || /^n\/?a$/i.test(trimmed)) return null;
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
  if (trimmed.includes("@") && !trimmed.includes("/")) {
    return `mailto:${trimmed.replace(/^mailto:/i, "")}`;
  }

  return `https://${trimmed.replace(/^\/+/, "")}`;
};

export const ImportantCallout = ({ service }) => {
  // Don't display the callout for ace-n or ace-s services
  if (!service || service.id === "ace-n" || service.id === "ace-s") {
    return null;
  }

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
  const websiteUrl = toAbsoluteExternalUrl(service.website);
  const communicationMattersUrl = toAbsoluteExternalUrl(
    service.communicationMatters
  );
  const showCommMatters =
    communicationMattersUrl && communicationMattersUrl !== websiteUrl;
  const emails = parseEmails(service.email);

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
          <strong>Email:</strong>
          <span className={styles.emailList}>
            {emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className={styles.emailLink}
              >
                {email}
              </a>
            ))}
          </span>
        </p>
        {websiteUrl && (
          <div className={styles.visitWebsiteContainer}>
            <Button href={websiteUrl}>Visit their website</Button>
          </div>
        )}
        {showCommMatters && (
          <a href={communicationMattersUrl}>
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
