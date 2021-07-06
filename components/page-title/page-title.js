import styles from "./page-title.module.css";

export const PageTitle = ({
  children,
  heading,
  description,
  className = "",
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div>
        <h1>
          <img
            width="41px"
            height="48px"
            src="/dash.svg"
            alt="A brush stroke"
          />
          {heading}
        </h1>
        <p>{description}</p>
      </div>
      {children && <div className={styles.childContainer}>{children}</div>}
    </div>
  );
};
