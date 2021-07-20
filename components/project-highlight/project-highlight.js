import styles from "./project-highlight.module.css";

import { ImageWithLoader as Image } from "../image";
import Link from "next/link";

export const ProjectHighlight = ({ project }) => {
  return (
    <>
      <h2 className={styles.topTitle}>
        Learn about how we created this resource
      </h2>
      <CardHighlight
        image={project.featuredImage}
        title={project.title}
        description={project.description}
        href={`/projects/${project.slug}`}
        viewText="View project"
      />
    </>
  );
};

export const CardHighlight = ({
  title,
  image,
  description,
  href,
  viewText,
}) => {
  return (
    <div className={styles.container}>
      {image && (
        <div className={styles.imageContainer}>
          <Image
            src={image.src}
            alt={image.alt}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Link href={href}>
          <a className={styles.viewAllLink}>{viewText} &gt;</a>
        </Link>
      </div>
    </div>
  );
};
