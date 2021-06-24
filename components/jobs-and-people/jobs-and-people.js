import Link from "next/link";
import styles from "./jobs-and-people.module.css";

export const JobsAndPeople = () => {
  return (
    <div className={styles.container}>
      <div className={styles.jobImage}>
        <img
          alt="placeholder"
          width="100%"
          height="100%"
          src="/placeholder.jpeg"
        />
      </div>
      <div className={styles.jobDescription}>
        <h2>Job opportunities</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <Link href="/jobs">View Jobs</Link>
      </div>
      <div className={styles.peopleImage}>
        <img
          alt="placeholder"
          width="100%"
          height="100%"
          src="/placeholder.jpeg"
        />
      </div>
      <div className={styles.peopleDescription}>
        <h2>Our team</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <Link href="/about/staff">Meet the team</Link>
      </div>
    </div>
  );
};
