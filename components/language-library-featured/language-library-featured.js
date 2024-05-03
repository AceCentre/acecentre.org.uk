import Link from "next/link";
import { LanguageLibraryCard } from "../language-library-card/language-library-card";
import styles from "./language-library-featured.module.css";

export const LanguageLibraryFeatured = ({ resources }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Featured Resources</h2>
        <Link href="/language-library/all">View All Resources &gt;</Link>
      </div>
      <div className={styles.list}>
        {resources.map((current, index) => (
          <LanguageLibraryCard
            index={index}
            key={current.post.post_name}
            resource={current}
          />
        ))}
      </div>
    </div>
  );
};
