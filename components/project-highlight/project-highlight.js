import styles from "./project-highlight.module.css";

import { ImageWithLoader as Image } from "../image";
import Link from "next/link";

export const ProjectHighlight = ({ project }) => {
  return (
    <>
      <h2 className={styles.topTitle}>
        Learn about how we created this resource
      </h2>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src={project.featuredImage.src}
            alt={project.featuredImage.alt}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{project.title}</h3>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
          <Link href={`/projects/${project.slug}`}>
            <a className={styles.viewAllLink}>View project &gt;</a>
          </Link>
        </div>
      </div>
    </>
  );
};
