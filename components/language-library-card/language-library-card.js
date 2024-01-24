import styles from "./language-library-card.module.css";
import { Image } from "../image";
import Link from "next/link";

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
    <Link
      href={`/language-library/${resource.post.post_name}`}
      className={styles.container}
      title={`Link to full resource: ${resource.post.post_title}`}
    >
      <div className={`${styles.imageContainer} ${backgroundClass}`}>
        <Image
          src={resource.image}
          width={200}
          height={150}
          className={`${styles.image}`}
          alt={`Screenshot of resource: ${resource.post.post_title}`}
        />
      </div>
      <h3>{resource.post.post_title}</h3>
      <p className={styles.addedBy}>Added by: {resource.author}</p>
    </Link>
  );
};
