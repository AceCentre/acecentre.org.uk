import styles from "./why-work-at-ace.module.css";

export const WhyWorkAtAce = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h2 className={styles.title}>
          Working at <span className={styles.titleName}>Ace Centre</span>
        </h2>
        <div className={styles.proContainer}>
          <div className={styles.proBlock}>
            <h3>Benefits</h3>
            <ul>
              <li>Company pension</li>
              <li>Supportive work environment</li>
              <li>On-site parking</li>
              <li>Time set aside for personal development</li>
            </ul>
          </div>
          <div className={styles.proBlock}>
            <h3>Experience</h3>
            <p>
              Gain deep understanding of the AAC and AT field by working with
              clients who use AAC/AT in their daily lives and gain experience in
              providing invaluable support to them.
            </p>
          </div>
          <div className={styles.proBlock}>
            <h3>Development</h3>
            <p>
              Spend time developing and updating your skills and knowledge in
              the field of AT and AAC. Regularly participate in local, regional,
              national and international networking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
