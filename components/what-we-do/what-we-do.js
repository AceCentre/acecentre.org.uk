import Link from "next/link";
import styles from "./what-we-do.module.css";

export const WhatWeDo = () => {
  console.log(styles);

  return (
    <div className={styles.container}>
      <h1>What we do</h1>
      <ul className={styles.list}>
        <li>
          <Link href="/services/nhs">NHS Services</Link>
        </li>
        <li>
          <Link href="/services/engineering">Engineering</Link>
        </li>
        <li>
          <Link href="/services/research">Research</Link>
        </li>
        <li>
          <Link href="/acecentre-learning">Ace Centre Learning</Link>
        </li>
        <li>
          <Link href="/services/assessment">Assessment</Link>
        </li>
        <li>
          <Link href="/services/advice-and-information">
            Advice and Information
          </Link>
        </li>
        <li>
          <Link href="/services/partnerships">Partnerships</Link>
        </li>
      </ul>
    </div>
  );
};
