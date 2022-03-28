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
          <svg
            width="41px"
            height="48px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 53 4"
          >
            <title>A brush stroke</title>
            <path
              fill="#00537F"
              fillRule="evenodd"
              d="M14.868 3.993C5.403 3.905 1.375 2.98.167 1.66-.236 1.265-.034 1 2.18 1.045 9.994 1.14 19.886.916 28.272.783c3.286-.052 6.341-.09 8.949-.09 10.069 0 13.895 1.012 15.104 2.288.402.396 0 .66-2.216.616-14.7-.264-25.978.484-35.241.396Z"
            />
          </svg>

          {heading}
        </h1>
        <p>{description}</p>
      </div>
      {children && <div className={styles.childContainer}>{children}</div>}
    </div>
  );
};
