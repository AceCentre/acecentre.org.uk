import Link from "next/link";
import styles from "./resource-categories-highlight.module.css";

export const ResourceCategoriesHighlight = () => {
  return (
    <ul className={styles.container}>
      <li>
        <Link href="/resources/all?category=alphabet-charts">
          Alphabet Charts
        </Link>
      </li>
      <li>
        <Link href="/resources/all?category=alphabet-books">
          Alphabet communication book templates
        </Link>
      </li>
      <li>
        <Link href="/resources/all?category=symbol-charts">Symbol Charts</Link>
      </li>
    </ul>
  );
};
