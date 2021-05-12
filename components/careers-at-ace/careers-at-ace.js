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
        <h2>Careers at AceCentre</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <Link href="/careers">
          <a className={styles.findYourJob}>Find your ideal job</a>
        </Link>
      </div>
    </div>
  );
};
