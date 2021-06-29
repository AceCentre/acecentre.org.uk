import styles from "./page-title.module.css";

export const PageTitle = ({ heading, description, className = "" }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <h1>
        <img width="41px" height="48px" src="/dash.svg" alt="A brush stroke" />
        {heading}
      </h1>
      <p>{description}</p>
    </div>
  );
};
