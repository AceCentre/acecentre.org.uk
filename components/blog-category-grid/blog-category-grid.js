import styles from "./blog-category-grid.module.css";

export const BlogCategoryGrid = () => {
  return (
    <div className={styles.container}>
      <div className={styles.category1}>
        <h2>Projects</h2>
      </div>
      <div className={styles.category2}>
        <h2>Company news</h2>
      </div>
      <div className={styles.category3}>
        <h2>Category1</h2>
      </div>
      <div className={styles.category4}>
        <h2>Category2</h2>
      </div>
      <div className={styles.category5}>
        <h2>Category3</h2>
      </div>
      <div className={styles.category6}>
        <h2>Category4</h2>
      </div>
      <div className={styles.category7}>
        <h2>Category5</h2>
      </div>
      <div className={styles.category8}>
        <h2>Category6</h2>
      </div>
    </div>
  );
};
