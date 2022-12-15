import { NewsletterSignup } from "../resources-download/resources-download";
import styles from "./service-finder-mailing-list.module.css";

export const ServiceFinderMailingList = () => {
  return <MailingList signUpIdentifier="service-finder" />;
};

export const MailingList = ({
  title = "Sign up for our newsletter",
  description = "Sign up to our free newsletter to stay up to date with the latest news from Ace Centre",
  signUpIdentifier = "home",
}) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p>{description}</p>
      <NewsletterSignup signUpIdentifier={signUpIdentifier} />
    </div>
  );
};
