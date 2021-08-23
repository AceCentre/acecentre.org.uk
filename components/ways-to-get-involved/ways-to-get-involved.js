import { Button } from "../button/button";
import styles from "./ways-to-get-involved.module.css";

export const WaysToGetInvolved = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ways to get involved</h2>
        <div className={styles.grid}>
          <div>
            <h3>Donate</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae.
            </p>
            <Button>Find out more</Button>
          </div>
          <div>
            <h3>Fundraise</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae.
            </p>
            <Button>Find out more</Button>
          </div>
          <div>
            <h3>Sponsor</h3>
            <p>
              Corporate sponsorship should not be one way, our aim is to work
              with the business community to the benefit of both parties.
            </p>
            <Button>Find out more</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
