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
            Send an email and a member of the Ace Centre team will be in touch
            as soon as possible.
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
            Looking for assistance? Call our advice helpline number for support:
          </p>
          <div className={styles.end}>
            <p className={styles.phoneNumber}>
              <strong>0800 080 3115</strong>
            </p>
            <p className={styles.officeHours}>
              Office hours, 9AM - 5PM, Monday - Friday
            </p>
          </div>
        </Card>
        <Card>
          <h3>Remote support</h3>
          <p>
            Download this app when remote support from the Ace Centre is needed
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
