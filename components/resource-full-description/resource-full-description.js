import styles from "./resource-full-description.module.css";

export const ResourceFullDescription = ({ resource }) => {
  return (
    <div
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: resource.description }}
    ></div>
  );
};
