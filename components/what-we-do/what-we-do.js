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
            <Link href="/services/nhs">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForwardIcon />
                </Avatar>
                NHS Services
              </a>
            </Link>
          </li>
          <li>
            <Link href="/services/engineering">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForwardIcon />
                </Avatar>
                Engineering
              </a>
            </Link>
          </li>
          <li>
            <Link href="/services/research">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForwardIcon />
                </Avatar>
                Research
              </a>
            </Link>
          </li>
          <li>
            <Link href="/learning">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForwardIcon />
                </Avatar>
                Ace Centre Learning
              </a>
            </Link>
          </li>
        </ul>
        <ul className={styles.unstyledList}>
          <li>
            <Link href="/services/assessments">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForwardIcon />
                </Avatar>
                Assessment
              </a>
            </Link>
          </li>
          <li>
            <Link href="/services/advice-information">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForwardIcon />
                </Avatar>
                Advice and Information
              </a>
            </Link>
          </li>
          <li>
            <Link href="/services/partnerships">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForwardIcon />
                </Avatar>
                Partnerships
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
