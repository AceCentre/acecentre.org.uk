import styles from "./how-can-we-help-cards.module.css";

export const HowCanWeHelpCards = () => {
  return (
    <div className={styles.container}>
      <h1>How can we help</h1>
      <div className={styles.allCards}>
        <div className={styles.gettingStarted}>
          <img
            alt="placeholder"
            width="100%"
            // height="250px"
            src="/placeholder.jpeg"
          />
          <h2>Getting started</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div className={styles.resources}>
          <img
            alt="placeholder"
            width="100%"
            // height="250px"
            src="/placeholder.jpeg"
          />
          <h2>Resources</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>

        <div className={styles.aceCentreLearning}>
          <img
            alt="placeholder"
            width="100%"
            // height="250px"
            src="/placeholder.jpeg"
          />
          <h2>Ace Centre Learning</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div className={styles.assessment}>
          <img
            alt="placeholder"
            width="100%"
            // height="250px"
            src="/placeholder.jpeg"
          />
          <h2>Assessment</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div className={styles.helpline}>
          <img
            alt="placeholder"
            width="100%"
            // height="250px"
            src="/placeholder.jpeg"
          />
          <h2>Helpline</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
      </div>
    </div>
  );
};
