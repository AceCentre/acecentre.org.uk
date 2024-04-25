import styles from "./language-library-header.module.css";

export const LanguageLibraryHeader = () => {
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={styles.innerContainer}>
          <div className={styles.titleContainer}>
            <img
              width="41px"
              height="48px"
              src="/dash-black.svg"
              alt="A brush stroke"
            />
            <h1>AAC Language Library</h1>
          </div>
          <p className={`${styles.description} description`}>
            Achieving Language Equity for Multilingual and Non-English Speaking
            AAC Users
          </p>
        </div>
      </div>
    </>
  );
};
