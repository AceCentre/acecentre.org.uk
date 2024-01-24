import Link from "next/link";
import { LanguageLibraryCard } from "../language-library-card/language-library-card";
import styles from "./language-library-relevant-resources.module.css";

export const LanguageLibraryRelevantResources = ({ resource }) => {
  return (
    <div>
      <div className={styles.titleAndLink}>
        <h2>Related Resources</h2>
        <Link
          href={`/language-library/all?languages=${resource.languages
            .map((x) => x.slug)
            .join(",")}`}
        >
          View All &gt;
        </Link>
      </div>
      <p className={styles.description}>
        Resources available in {formatList(resource.languages, "name")}
      </p>
      <div className={styles.container}>
        {resource.relevantResources.map((current, index) => (
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

const formatList = (list, key) => {
  const lf = new Intl.ListFormat("en");
  return lf.format(list.map((x) => x[key]));
};
