/* eslint-disable indent */
import styles from "./top-banner.module.css";

import Link from "next/link";

export const TopBanner = () => {
  return (
    <div className={styles.container}>
      <p>
      🎉 Join us for Communication Works North oon Friday 16th May!{" "}
        <Link href="/communication-works-2025">
        Find out more and register for your FREE ticket here
        </Link>
      </p>
    </div>
  );
};
