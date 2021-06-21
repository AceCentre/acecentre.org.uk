import { Avatar } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import Link from "next/link";
import styles from "./what-we-do.module.css";

export const WhatWeDo = () => {
  return (
    <div className={styles.container}>
      <h1>What we do</h1>
      <ul className={styles.list}>
        <div>
          <li>
            <Link href="/services/nhs">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForward />
                </Avatar>
                NHS Services
              </a>
            </Link>
          </li>
          <li>
            <Link href="/services/engineering">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForward />
                </Avatar>
                Engineering
              </a>
            </Link>
          </li>
          <li>
            <Link href="/services/research">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForward />
                </Avatar>
                Research
              </a>
            </Link>
          </li>
          <li>
            <Link href="/acecentre-learning">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForward />
                </Avatar>
                Ace Centre Learning
              </a>
            </Link>
          </li>
        </div>
        <div>
          <li>
            <Link href="/services/assessment">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForward />
                </Avatar>
                Assessment
              </a>
            </Link>
          </li>
          <li>
            <Link href="/services/advice-and-information">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForward />
                </Avatar>
                Advice and Information
              </a>
            </Link>
          </li>
          <li>
            <Link href="/services/partnerships">
              <a className={styles.link}>
                <Avatar className={styles.avatar}>
                  <ArrowForward />
                </Avatar>
                Partnerships
              </a>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};
