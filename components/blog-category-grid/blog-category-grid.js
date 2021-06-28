import styles from "./blog-category-grid.module.css";

export const BlogCategoryGrid = ({ blogCategories }) => {
  return (
    <div>
      <h3>Browse articles by category</h3>
      <ul>
        {blogCategories.map((category) => {
          return (
            <li key={`browse-articles-${category.slug}`}>{category.title}</li>
          );
        })}
      </ul>
    </div>
  );
};
