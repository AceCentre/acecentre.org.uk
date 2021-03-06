import Link from "next/link";
import styles from "./all-categories.module.css";

export const AllCategories = ({ blogCategories = [] }) => {
  return (
    <div className={styles.container}>
      <h2>All categories</h2>
      <ul className={styles.list}>
        {blogCategories.map((category) => (
          <li key={`category-${category.slug}`}>
            <Link href={`/blog/category/${category.slug}`}>
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
