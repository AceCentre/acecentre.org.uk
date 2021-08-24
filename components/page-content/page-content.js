import styles from "./page-content.module.css";

export const PageContent = ({ content }) => {
  return (
    <div
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};
