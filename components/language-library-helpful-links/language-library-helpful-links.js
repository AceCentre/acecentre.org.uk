import { Card } from "../latest-from-blog/latest-from-blog";
import styles from "./language-library-helpful-links.module.css";

export const LanguageLibraryHelpfulLinks = ({ helpfulLinks }) => {
  return (
    <div className={styles.outerContainer}>
      <div className={`${styles.container}`}>
        <div className={styles.titleContainer}>
          <div>
            <h2 className={styles.title}>Helpful Links</h2>
            <p className={styles.tagline}>
              <i>Links to resources that will help you support AAC users</i>
            </p>
          </div>
        </div>
        <ul className={styles.postList}>
          {helpfulLinks.map((helpfulLink) => {
            return (
              <Card
                className={styles.card}
                postTitleContainerClassName={styles.postTitleContainer}
                imageContainerClassName={styles.imageContainer}
                href={Array.isArray(helpfulLink.helpfulLink) ? helpfulLink.helpfulLink[0] : helpfulLink.helpfulLink}
                key={`${helpfulLink.title}-card`}
                featuredImage={{ src: helpfulLink.image }}
                title={helpfulLink.title}
                showSubtitle={false}
              >
                <p className={styles.productTitle}>{helpfulLink.title}</p>
              </Card>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
