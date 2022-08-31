import Link from "next/link";
import { Button } from "../button/button";
import { CONTACT_FORM, FormModal } from "../ms-form";
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
          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.buttonMargin}>
                <Button onClick={onClick}>Contact form</Button>
              </div>
            )}
          </FormModal>
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
            <Link href="https://get.teamviewer.com/ace_centre">
              Download app &gt;
            </Link>
          </div>
        </Card>
      </ul>
    </div>
  );
};

const Card = ({ children }) => {
  return <li className={styles.cardContainer}>{children}</li>;
};
