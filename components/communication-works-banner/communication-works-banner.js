import Link from "next/link";
import styles from "./communication-works-banner.module.css";

export const CommunicationWorksBanner = () => {
  return (
    <div className={styles.container}>
      <p>
        🎉 Communication Works: live AT events coming in May 2022.{" "}
        <Link href="/communication-works">Click here to find out more!</Link>
      </p>
    </div>
  );
};
