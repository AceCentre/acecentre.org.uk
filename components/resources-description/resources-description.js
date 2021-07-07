import styles from "./resources-description.module.css";

export const ResourcesDescription = ({ resource }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{resource.name}</h1>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: resource.description }}
      />
    </div>
  );
};
