import { ImageWithLoader as Image } from "../image";
import styles from "./resources-image.module.css";

export const ResourcesImage = ({ resource }) => {
  if (!resource.image) return null;

  return (
    <div className={styles.container}>
      <Image
        src={resource.image.src}
        alt={resource.image.alt}
        layout="fill"
        objectFit={"contain"}
      />
    </div>
  );
};
