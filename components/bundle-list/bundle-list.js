import Link from "next/link";
import styles from "./bundle-list.module.css";

export const BundleList = ({ bundle }) => {
  return (
    <div className={styles.container}>
      <h2>Included courses:</h2>
      <ul className={styles.list}>
        {bundle.courses.map((course) => (
          <BundleItem key={course.slug} course={course}></BundleItem>
        ))}
      </ul>
    </div>
  );
};

const BundleItem = ({ course }) => {
  return (
    <li className={styles.inlineCard}>
      <h3>{course.title}</h3>
      <p className={styles.date}>{course.date.tagline}</p>
      <p>{course.shortDescription}</p>
      <Link href={`/learning/${course.slug}`}>
        <a className={styles.link}>View course &gt;</a>
      </Link>
    </li>
  );
};
