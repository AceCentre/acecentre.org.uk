import styles from "./search-box.module.css";

export const SearchBox = ({
  title,
  description,
  searchEndpoint,
  ariaLabel,
  placeholder,
  searchButtonText,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1>{title}</h1>
        <p>{description}</p>
        <form action={searchEndpoint} method="GET" className={styles.form}>
          <input
            aria-label={ariaLabel}
            name="searchText"
            type="text"
            placeholder={placeholder}
          />
          <button type="submit">{searchButtonText}</button>
        </form>
      </div>
    </div>
  );
};
