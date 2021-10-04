import styles from "./skip-link.module.css";

export const SkipLink = () => {
  return (
    <a className={styles.skipLink} href="#mainContent">
      Skip to content
    </a>
  );
};
