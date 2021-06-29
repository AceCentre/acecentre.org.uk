import Link from "next/link";
import styles from "./back-to-link.module.css";

export const BackToLink = ({ where, href }) => {
  return (
    <div className={styles.container}>
      <Link href={href}>
        <a className={styles.backToLink}>&lt; Back to {where}</a>
      </Link>
    </div>
  );
};
