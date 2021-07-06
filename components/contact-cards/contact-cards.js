import Link from "next/link";
import styles from "./contact-cards.module.css";

import { Avatar } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const ContactCards = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>How can we help you?</h2>
      <ul className={styles.list}>
        <Card>
          <h3>Advice helpline</h3>
          <p>
            If you’re a teacher or carer looking for assistance call our advice
            helpline number:
          </p>
          <p className={styles.phoneNumber}>0800 048 7642</p>
          <p className={styles.officeHours}>Office hours, Monday - Friday</p>
          <Link href="mailto:enquiries@acecentre.org.uk">
            <a className={styles.link}>Email us &gt;</a>
          </Link>
        </Card>
        <Card>
          <h3>Technical Support</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </p>
          <Link href="/tech-support">
            <a className={styles.link}>Get technical support &gt;</a>
          </Link>
        </Card>
        <Card>
          <h3>Useful links</h3>
          <ul className={styles.linkList}>
            <UsefulLink href="/resources">Resources</UsefulLink>
            <UsefulLink href="/getting-started">Getting started</UsefulLink>
            <UsefulLink href="/partnerships">Partnerships</UsefulLink>
            <UsefulLink href="/information-days">Information days</UsefulLink>
          </ul>
        </Card>
      </ul>
    </div>
  );
};

const UsefulLink = ({ children, href }) => {
  return (
    <li>
      <Link href={href}>
        <a className={styles.linkListLink}>
          <Avatar className={styles.arrowAvatar}>
            <ChevronRightIcon className={styles.avatarIcon} />
          </Avatar>
          {children}
        </a>
      </Link>
    </li>
  );
};

const Card = ({ children }) => {
  return <li className={styles.listItem}>{children}</li>;
};
