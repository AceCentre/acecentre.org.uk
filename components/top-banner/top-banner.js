/* eslint-disable indent */
// Site-wide banner. Rendered from pages/_app.js.
import styles from "./top-banner.module.css";

export const TopBanner = () => {
  return (
    <div className={styles.container}>
      <p>
        Due to global technical issues affecting Microsoft platforms today, we
        are experiencing difficulties with e-mail and other applications. Our
        phone lines remain open and we are able to take calls, however, emails
        may not be received or responded to until this issue is resolved. We
        thank you for your patience with this matter.
      </p>
    </div>
  );
};
