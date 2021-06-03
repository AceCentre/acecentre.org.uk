import styles from "./pagination.module.css";

export const Pagination = ({ pageCount, currentPage }) => {
  let arrayOfNumbers = [];
  for (let i = 1; i < pageCount + 1; i++) {
    arrayOfNumbers.push(i);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {currentPage > 1 && <li className={styles.listItem}>Next</li>}
        {arrayOfNumbers.map((currentPageNumber) => (
          <li
            className={`${styles.listItem} ${
              currentPageNumber === currentPage ? styles.selectedItem : ""
            }`}
            key={`page-${currentPageNumber}`}
          >
            {currentPageNumber}
          </li>
        ))}
        {currentPage < pageCount && (
          <li className={styles.listItem}>Previous</li>
        )}
      </ul>
    </div>
  );
};
