/* eslint-disable indent */
import styles from "./top-banner.module.css";

import Link from "next/link";

export const TopBanner = () => {
  return (
    <div className={styles.container}>
      <p>
        🎉 Join us for Communication Works North on Friday 16th May!{" "}
        <Link href="/communication-works-2025">
        Click here to find out more and see the seminar programme
        </Link>
      </p>
    </div>
  );
};
