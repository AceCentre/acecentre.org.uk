import styles from "./language-library-card.module.css";
import { Image } from "../image";

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

export const LanguageLibraryCard = ({ resource, index = 0 }) => {
  const backgroundClass =
    listOfBackgrounds[index == 0 ? 0 : index % listOfBackgrounds.length];

  return (
    <div className={styles.container}>
      <div className={`${styles.imageContainer} ${backgroundClass}`}>
        <Image
          src={resource.featuredImage.node.mediaItemUrl}
          width={200}
          height={150}
          className={`${styles.image}`}
        />
      </div>
      <h3>{resource.title}</h3>
      <p>Added by: {resource.authorUsername}</p>
      <p>{resource.languages.nodes.map((x) => x.name).join(", ")}</p>
    </div>
  );
};
