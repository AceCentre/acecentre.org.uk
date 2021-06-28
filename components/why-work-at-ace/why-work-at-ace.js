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
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt.
            </p>
          </div>
          <div className={styles.proBlock}>
            <h3>Experience</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt.
            </p>
          </div>
          <div className={styles.proBlock}>
            <h3>Growth</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
