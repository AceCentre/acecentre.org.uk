import Link from "next/link";
import styles from "./get-involved.module.css";

export const GetInvolved = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1>Get involved</h1>
        <p>
          Your support is vital to our ongoing work to ensure that children and
          adults with the most challenging communication difficulties have free
          access to the advice, information and support they need to fulfil
          their potential
        </p>
        <div className={styles.buttonContainer}>
          <div className={styles.getInvolved}>
            <Link href="/get-involved">Ways to get involved</Link>
          </div>
          <Link href="/donate">Make a donation</Link>
        </div>
      </div>
    </div>
  );
};
