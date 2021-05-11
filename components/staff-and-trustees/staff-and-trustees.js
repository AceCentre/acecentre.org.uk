import Link from "next/link";
import styles from "./staff-and-trustees.module.css";

export const StaffAndTrustees = () => {
  return (
    <div className={styles.container}>
      <div className={styles.peopleImage}>
        <img
          alt="placeholder"
          width="100%"
          height="250px"
          src="/placeholder.jpeg"
        />
      </div>
      <div className={styles.peopleDescription}>
        <h2>Our people</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <Link href="/about/staff">Meet the team</Link>
      </div>
      <div className={styles.trusteeImage}>
        <img
          alt="placeholder"
          width="100%"
          height="250px"
          src="/placeholder.jpeg"
        />
      </div>
      <div className={styles.trusteeDescription}>
        <h2>Our Trustees</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <Link href="/about/trustees">Meet the trustees</Link>
      </div>
    </div>
  );
};
