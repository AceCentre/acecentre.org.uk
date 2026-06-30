import { NewsletterSignup } from "../resources-download/resources-download";
import styles from "./service-finder-mailing-list.module.css";

export const ServiceFinderMailingList = () => {
  return <MailingList signUpIdentifier="service-finder" />;
};

export const MailingList = ({
  title = "Sign up for our newsletter",
  signUpIdentifier = "home",
}) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <NewsletterSignup
        tags={[{ name: "service-finder" }]}
        signUpIdentifier={signUpIdentifier}
      />
    </div>
  );
};
