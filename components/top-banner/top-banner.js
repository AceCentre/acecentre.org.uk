/* eslint-disable indent */
import styles from "./top-banner.module.css";

import Link from "next/link";

export const TopBanner = () => {
  return (
    <div className={styles.container}>
      <p>
        🎉 Communication Works: live AT events coming in May 2024.{" "}
        <Link href="/communication-works-2024">
          Click here to find out more!
        </Link>
      </p>
    </div>
  );
};
