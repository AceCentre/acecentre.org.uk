import { Button } from "../button/button";
import styles from "./ways-to-get-involved.module.css";

export const WaysToGetInvolved = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ways to get involved</h2>
        <div className={styles.grid}>
          <div className={styles.element}>
            <h3>Donate</h3>
            <p>
              Help to ensure we can continue to offer free information and
              helpline services to everyone who needs them
            </p>
            <div className={styles.buttonContainer}>
              <Button href="/get-involved/donate">Find out more</Button>
            </div>
          </div>
          <div className={styles.element}>
            <h3>Fundraise</h3>
            <p>
              As a charity we depend on donations for vital services, from
              baking caked to running marathons, find out ways you can help.
            </p>
            {/* <div className={styles.buttonContainer}>
              <Button href="/get-involved/fundraise">Find out more</Button>
            </div> */}
          </div>
          <div className={styles.element}>
            <h3>Sponsor</h3>
            <p>
              Corporate sponsorship should not be one way, our aim is to work
              with the business community to the benefit of both parties.
            </p>
            {/* <div className={styles.buttonContainer}>
              <Button href="/get-involved/sponsor">Find out more</Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
