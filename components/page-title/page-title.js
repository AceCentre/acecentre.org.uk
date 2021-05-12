import styles from "./page-title.module.css";

export const PageTitle = ({ heading, description }) => {
  return (
    <div className={styles.container}>
      <h1>{heading}</h1>
      <p>{description}</p>
    </div>
  );
};
