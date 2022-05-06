import styles from "./old-browser-banner.module.css";

export const OldBrowserBanner = () => {
  return (
    <div className={styles.ieNotice}>
      <h1>Your web browser is out of date.</h1>
      <p>
        We no longer support your browser. Please open our website in another
        browser, e.g. Google Chrome
      </p>
    </div>
  );
};
