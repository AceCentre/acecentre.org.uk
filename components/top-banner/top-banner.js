/* eslint-disable indent */
// Site-wide promo banner. Rendered from pages/_app.js — uncomment <TopBanner /> there to show again.
import styles from "./top-banner.module.css";

import Link from "next/link";

export const TopBanner = () => {
  return (
    <div className={styles.container}>
      <p>
        🎉 Join us for Communication Works North on Friday 22nd May!{" "}
        <Link href="/communication-works-2026">
          Click here to find out more and see the seminar programme
        </Link>
      </p>
    </div>
  );
};
