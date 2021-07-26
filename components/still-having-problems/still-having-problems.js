import Link from "next/link";
import { Button } from "../button/button";
import styles from "./still-having-problems.module.css";

export const StillHavingProblems = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Still having problems?</h2>
      <ul className={styles.list}>
        <Card>
          <h3>Get in touch</h3>
          <p>
            Would you like to send our team and email? we normally respond
            within X hours.
          </p>
          <Link href="/contact">
            <a className={`${styles.end} ${styles.contactUsLink}`}>
              Contact us online &gt;
            </a>
          </Link>
        </Card>
        <Card>
          <h3>Give us a call</h3>
          <p>
            If you’re a teacher or carer looking for assistance call our advice
            helpline number:
          </p>
          <div className={styles.end}>
            <p className={styles.phoneNumber}>
              <strong>0800 048 7642</strong>
            </p>
            <p className={styles.officeHours}>Office hours, Monday - Friday</p>
          </div>
        </Card>
        <Card>
          <h3>Remote support</h3>
          <p>
            If you do need to get remote support from the Ace centre download
            the app.
          </p>
          <div className={`${styles.end} ${styles.button}`}>
            <Button href="https://get.teamviewer.com/ace_centre">
              Download app
            </Button>
          </div>
        </Card>
      </ul>
    </div>
  );
};

const Card = ({ children }) => {
  return <li className={styles.cardContainer}>{children}</li>;
};
