import { BackToLink } from "../back-to-link/back-to-link";
import { Image } from "../image";
import styles from "./language-library-resource-page.module.css";

const listOfBackgrounds = [
  styles.blueGradient,
  styles.yellowGradient,
  styles.redGradient,
  styles.orangeGradient,
  styles.redGradient,
  styles.orangeGradient,
  styles.blueGradient,
  styles.yellowGradient,
];

export const LanguageLibraryResourcePage = ({ resource }) => {
  console.log(resource);
  const backgroundClass =
    listOfBackgrounds[
      resource.databaseId == 0
        ? 0
        : resource.databaseId % listOfBackgrounds.length
    ];
  return (
    <div className={styles.container}>
      <BackToLink
        className={styles.backTo}
        href="/language-library/all"
        where="language library"
      />
      <div className={styles.topContainer}>
        <div className={`${styles.imageContainer} ${backgroundClass}`}>
          <Image
            src={resource.featuredImage.node.mediaItemUrl}
            height={200}
            width={400}
          />
        </div>
        <h1>{resource.title}</h1>
      </div>
    </div>
  );
};
