import Link from "next/link";
import styles from "./contact-cards.module.css";

import Avatar from "@material-ui/core/Avatar";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Button } from "../button/button";
import { CONTACT_FORM, FormModal } from "../ms-form";

export const ContactCards = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>How can we help you?</h2>
      <ul className={styles.list}>
        <Card>
          <h3>Contact us</h3>
          <p>Get in touch with Ace Centre by filling out our contact form.</p>
          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.buttonMargin}>
                <Button onClick={onClick}>Contact form</Button>
              </div>
            )}
          </FormModal>
        </Card>
        <Card>
          <h3>Advice helpline</h3>
          <p>
            If you&apos;re looking for assistance about Augmentative and
            Alternative Communication (AAC) and Assistive Technology call our
            advice helpline number:
          </p>
          <p className={styles.phoneNumber}>0800 080 3115</p>
          <p className={styles.officeHours}>
            Office hours, 9AM - 5PM, Monday - Friday
          </p>
          <Link
            href="mailto:enquiries@acecentre.org.uk"
            className={styles.link}
          >
            Email us &gt;
          </Link>
        </Card>
        <Card>
          <h3>Technical Support</h3>
          <p>What to do when you&apos;re having device problems</p>
          <Link href="/technical-support" className={styles.link}>
            Get technical support &gt;
          </Link>
        </Card>
        <Card>
          <h3>Useful links</h3>
          <ul className={styles.linkList}>
            <UsefulLink href="/resources">Resources</UsefulLink>
            <UsefulLink href="/getting-started">Getting started</UsefulLink>
            <UsefulLink href="/services/partnerships">Partnerships</UsefulLink>
            <UsefulLink href="/information-appointments">
              Information appointments
            </UsefulLink>
            <UsefulLink href="/feedback">Give us feedback</UsefulLink>
          </ul>
        </Card>
      </ul>
    </div>
  );
};

const UsefulLink = ({ children, href }) => {
  return (
    <li>
      <Link href={href} className={styles.linkListLink}>
        <Avatar className={styles.arrowAvatar}>
          <ChevronRightIcon className={styles.avatarIcon} />
        </Avatar>
        {children}
      </Link>
    </li>
  );
};

const Card = ({ children }) => {
  return <li className={styles.listItem}>{children}</li>;
};
