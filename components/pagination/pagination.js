import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./pagination.module.css";

export const Pagination = ({ pageCount, currentPage }) => {
  const { query } = useRouter();

  let arrayOfNumbers = [];
  for (let i = 1; i < pageCount + 1; i++) {
    arrayOfNumbers.push(i);
  }

  const changePageLink = (newPageNumber) => {
    const newQuery = { ...query, page: newPageNumber };
    const queryStringPairs = [];

    for (const [key, value] of Object.entries(newQuery)) {
      if (value === null) continue;
      if (value === "") continue;

      queryStringPairs.push(`${key}=${value}`);
    }

    const newQueryString = queryStringPairs.join("&");

    return `/resources/all?${newQueryString}`;
  };

  const currentPageAsInt = parseInt(currentPage);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {currentPageAsInt > 1 && (
          <li>
            <Link href={changePageLink(currentPageAsInt - 1)}>
              <a className={styles.listItem}>Previous</a>
            </Link>
          </li>
        )}
        {arrayOfNumbers.map((currentPageNumber) => (
          <li key={`page-${currentPageNumber}`}>
            <Link href={changePageLink(currentPageNumber)}>
              <a
                className={`${styles.listItem} ${
                  currentPageNumber === currentPageAsInt
                    ? styles.selectedItem
                    : ""
                }`}
              >
                {currentPageNumber}
              </a>
            </Link>
          </li>
        ))}
        {currentPageAsInt < pageCount && (
          <li>
            <Link href={changePageLink(currentPageAsInt + 1)}>
              <a className={styles.listItem}>Next</a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
