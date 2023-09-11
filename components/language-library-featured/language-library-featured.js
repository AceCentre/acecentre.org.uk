import { LanguageLibraryCard } from "../language-library-card/language-library-card";
import styles from "./language-library-featured.module.css";

export const LanguageLibraryFeatured = ({ resources }) => {
  return (
    <div className={styles.container}>
      <h2>Featured Resources</h2>
      <div className={styles.list}>
        {resources.map((current, index) => (
          <>
            <LanguageLibraryCard
              index={index}
              key={current.slug}
              resource={current}
            />
          </>
        ))}
      </div>
    </div>
  );
};
