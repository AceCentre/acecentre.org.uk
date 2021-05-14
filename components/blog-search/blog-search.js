import styles from "./blog-search.module.css";

export const BlogSearch = ({ submitSearch }) => {
  const submitSearchForm = (event) => {
    const inputField = event.target.searchContent;
    event.preventDefault();

    if (submitSearch) {
      submitSearch(inputField.value);
    } else {
      console.log(
        "No submit search handler. The user searched:",
        inputField.value
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1>Blog</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <form onSubmit={submitSearchForm} className={styles.form}>
          <input
            name="searchContent"
            type="text"
            placeholder="What are you looking for?"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};
