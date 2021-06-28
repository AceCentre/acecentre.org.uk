import styles from "./page-title.module.css";

export const PageTitle = ({ heading, description }) => {
  return (
    <div className={styles.container}>
      <h1>
        <img width="41px" src="/dash.svg" alt="A brush stroke" />
        {heading}
      </h1>
      <p>{description}</p>
    </div>
  );
};
