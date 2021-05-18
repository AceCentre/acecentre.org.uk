import Link from "next/link";
import styles from "./research-cta.module.css";

export const ResearchCta = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dedicationToResearchImage}>
        <img
          alt="placeholder"
          width="100%"
          height="100%"
          src="/placeholder.jpeg"
        />
      </div>
      <div className={styles.dedicationToResearch}>
        <h2>Our dedication to research</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
      </div>
      <div className={styles.ourResourcesImage}>
        <img
          alt="placeholder"
          width="100%"
          height="100%"
          src="/placeholder.jpeg"
        />
      </div>
      <div className={styles.ourResources}>
        <h2>Our resources</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <Link href="/resources">View all resources</Link>
      </div>
    </div>
  );
};
