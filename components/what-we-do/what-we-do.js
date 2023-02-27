import Avatar from "@material-ui/core/Avatar";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Link from "next/link";
import styles from "./what-we-do.module.css";

export const WhatWeDo = () => {
  return (
    <div className={styles.container}>
      <h1>More ways we can help</h1>
      <p>
        Ace Centre provides a range of services to support children and adults
        with severe communication difficulties
      </p>
      <div className={styles.list}>
        <ul className={styles.unstyledList}>
          <li>
            <Link href="/services/nhs" className={styles.link}>

              <Avatar className={styles.avatar}>
                <ArrowForwardIcon />
              </Avatar>NHS Services
            </Link>
          </li>
          <li>
            <Link href="/services/engineering" className={styles.link}>

              <Avatar className={styles.avatar}>
                <ArrowForwardIcon />
              </Avatar>Engineering
            </Link>
          </li>
          <li>
            <Link href="/services/research" className={styles.link}>

              <Avatar className={styles.avatar}>
                <ArrowForwardIcon />
              </Avatar>Research
            </Link>
          </li>
          <li>
            <Link href="/learning" className={styles.link}>

              <Avatar className={styles.avatar}>
                <ArrowForwardIcon />
              </Avatar>Ace Centre Learning
            </Link>
          </li>
        </ul>
        <ul className={styles.unstyledList}>
          <li>
            <Link href="/services/assessments" className={styles.link}>

              <Avatar className={styles.avatar}>
                <ArrowForwardIcon />
              </Avatar>Assessment
            </Link>
          </li>
          <li>
            <Link href="/services/advice-information" className={styles.link}>

              <Avatar className={styles.avatar}>
                <ArrowForwardIcon />
              </Avatar>Advice and Information
            </Link>
          </li>
          <li>
            <Link href="/services/partnerships" className={styles.link}>

              <Avatar className={styles.avatar}>
                <ArrowForwardIcon />
              </Avatar>Partnerships
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
