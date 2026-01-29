import Link from "next/link";
import styles from "./contact-cards.module.css";

import Avatar from "@mui/material/Avatar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { Button } from "../button/button";
// import { CONTACT_FORM, FormModal } from "../ms-form";

export const ContactCards = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>How can we help you?</h2>
      <ul className={styles.list}>
        <Card>
          <h3>General Enquiries</h3>
          <p>
            For general enquiries about our charitable services, resources,
            billing and accounts, events or marketing contact our enquiries
            line:
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
          <h3>Advice helpline</h3>
          <p>
            If you have a question about Augmentative and Alternative
            Communication (AAC) and Assistive Technology call our advice
            helpline number:
          </p>
          <p className={styles.phoneNumber}>
            0800 080 3115 <span className={styles.option}>option 2</span>
          </p>
          <p className={styles.officeHours}>
            Adviceline Hours - Monday, Wednesday and Friday from 1PM- 5PM
          </p>
          <Link href="mailto:advice@acecentre.org.uk" className={styles.link}>
            Email us &gt;
          </Link>
        </Card>
        <Card>
          <h3>NHSE Specialised AAC Service</h3>
          <p>
            Contact our NHS admin team regarding the status of NHS referrals,
            NHS clients or upcoming appointments:{" "}
          </p>
          <p className={styles.phoneNumber}>
            0800 080 3115 <span className={styles.option}>option 2</span>
          </p>
          <p className={styles.officeHours}>
            Office hours, 9AM - 5PM, Monday - Friday
          </p>
          <Link href="mailto:acecentre.admin@nhs.net" className={styles.link}>
            Email us &gt;
          </Link>
          <p>
            <br />
            <b>Technical Support:</b> help if you are having problems with a
            device from Ace Centre{" "}
          </p>
          <Link href="/technical-support" className={styles.link}>
            Get technical support &gt;
          </Link>
        </Card>
        <Card>
          <h3>FAQs</h3>
          <ul className={styles.linkList}>
            <UsefulLink href="/services/nhs/referral-process">
              How do I refer someone for an NHSE assessment?
            </UsefulLink>
            <UsefulLink href="/services/nhs/I-have-a-device">
              What do I do if my Ace Centre device is broken or needs updating?
            </UsefulLink>
            <UsefulLink href="/getting-started/what-is-aac-what-is-at">
              How can I get started with AAC?
            </UsefulLink>
            <UsefulLink href="/learning">
              What training do you offer?
            </UsefulLink>
            <UsefulLink href="/feedback">How can I give feedback?</UsefulLink>
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
