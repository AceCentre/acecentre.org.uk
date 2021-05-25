import Link from "next/link";
import styles from "./resource-categories-highlight.module.css";

export const ResourceCategoriesHighlight = () => {
  return (
    <ul className={styles.container}>
      <li>
        <Link href="/resources/categories/alphabet-charts">
          Alphabet Charts
        </Link>
      </li>
      <li>
        <Link href="/resources/categories/alphabet-books">
          Alphabet communication book templates
        </Link>
      </li>
      <li>
        <Link href="/resources/categories/symbol-charts">Symbol Charts</Link>
      </li>
    </ul>
  );
};
