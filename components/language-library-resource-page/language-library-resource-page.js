import { BackToLink } from "../back-to-link/back-to-link";
import { Button } from "../button/button";
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
        <div>
          <h1>{resource.title}</h1>
          <p>{resource.description}</p>
          {resource.resourceFiles.nodes.length === 1 && (
            <div className={styles.downloadButton}>
              <Button href={resource.resourceFiles.nodes[0].mediaItemUrl}>
                Download Resource
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
