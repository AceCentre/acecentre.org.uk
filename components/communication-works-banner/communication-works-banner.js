import Link from "next/link";
import styles from "./communication-works-banner.module.css";

export const CommunicationWorksBanner = () => {
  return (
    <div className={styles.container}>
      <p>
        🎉 Checkout this sentence about communication works.{" "}
        <Link href="/communication-works">Click here to find out more!</Link>
      </p>
    </div>
  );
};
