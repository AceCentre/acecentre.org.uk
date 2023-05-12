/* eslint-disable indent */
import { useGlobalProps } from "../../lib/global-props/hook";
import styles from "./top-banner.module.css";

import Link from "next/link";

export const TopBanner = () => {
  const global = useGlobalProps();
  const currentDate = new Date(global.fullDate);

  const startDate = new Date("2023-05-15T13:00:00.000+01:00");
  const endDate = new Date("2023-05-17T13:00:00.000+01:00");

  return (
    <div className={styles.container}>
      {currentDate.getTime() > startDate.getTime() &&
      currentDate.getTime() < endDate.getTime() ? (
        <p>
          Due to a staff training event our office will be{" "}
          <span className={styles.closed}>CLOSED</span> from midday 15.5.23 to
          17.5.23.
        </p>
      ) : (
        <p>
          🎉 Communication Works: live AT events coming in May 2023.{" "}
          <Link href="/communication-works">Click here to find out more!</Link>
        </p>
      )}
    </div>
  );
};
