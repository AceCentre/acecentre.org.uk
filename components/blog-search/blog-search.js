import styles from "./blog-search.module.css";

export const BlogSearch = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1>Blog</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <form action="/blog/search" method="GET" className={styles.form}>
          <input
            aria-label="Search blog posts"
            name="searchText"
            type="text"
            placeholder="What are you looking for?"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};
