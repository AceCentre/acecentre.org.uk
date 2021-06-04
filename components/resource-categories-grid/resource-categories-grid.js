import styles from "./resource-categories-grid.module.css";

export const ResourceCategoriesGrid = () => {
  return (
    <div className={styles.container}>
      <div className={styles.category1}>
        <h2>Getting started</h2>
      </div>
      <div className={styles.category2}>
        <h2>Supporting language</h2>
      </div>
      <div className={styles.category3}>
        <h2>Supporting access</h2>
      </div>
      <div className={styles.category4}>
        <h2>Working in schools</h2>
      </div>
      <div className={styles.category5}>
        <h2>Family and friends</h2>
      </div>
      <div className={styles.category6}>
        <h2>Software</h2>
      </div>
      <div className={styles.category7}>
        <h2>Alphabet resources</h2>
      </div>
      <div className={styles.category8}>
        <h2>Symbol resources</h2>
      </div>
      <div className={styles.category9}>
        <h2>All resources</h2>
      </div>
    </div>
  );
};
