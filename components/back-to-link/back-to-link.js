import Link from "next/link";
import styles from "./back-to-link.module.css";

export const BackToLink = ({ where, href, className = "" }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <Link href={href}>
        <a className={styles.backToLink}>&lt; Back to {where}</a>
      </Link>
    </div>
  );
};
