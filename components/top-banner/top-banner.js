/* eslint-disable indent */
// Site-wide promo banner. Rendered from pages/_app.js — uncomment <TopBanner /> there to show again.
import styles from "./top-banner.module.css";

import Link from "next/link";

export const TopBanner = () => {
  return (
    <div className={styles.container}>
      <p>
        🎉 Meet us at TES SEND Show 2026.{" "}
        <Link href="/newsletter?source=cta&tag=tes-send-show-2026&returnTo=/&utm_source=tes_send_show&utm_medium=banner&utm_campaign=tes_send_show_2026">
          Sign up for updates from the event
        </Link>
      </p>
    </div>
  );
};
