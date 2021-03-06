import Link from "next/link";
import styles from "./careers-at-ace.module.css";

export const CareersAtAce = () => {
  return (
    <div className={styles.container}>
      <div>
        <img
          alt="placeholder"
          width="100%"
          height="100%"
          src="/placeholder.jpeg"
        />
      </div>
      <div>
        <h2>Careers at Ace Centre</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <Link href="/work-with-us">
          <a className={styles.findYourJob}>Find your ideal job</a>
        </Link>
      </div>
    </div>
  );
};
