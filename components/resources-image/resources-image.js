import { ImageWithLoader as Image } from "../image";
import styles from "./resources-image.module.css";

export const ResourcesImage = ({ resource, priority }) => {
  if (!resource.image) return null;

  const alt = resource?.image?.alt || `Featured image of: ${resource.name}`;

  return (
    <div className={styles.container}>
      <Image
        src={resource.image.src}
        alt={alt}
        layout="fill"
        objectFit={"contain"}
        priority={priority}
      />
    </div>
  );
};

export const ResourcesImageL2T = () => {
  return (
    <div className={styles.l2tContainer}>
      <Image
        src={"/Look2Talk.jpg"}
        alt={"Look2Talk with eyes in the 'o'"}
        layout="fill"
        objectFit={"contain"}
      />
    </div>
  );
};
