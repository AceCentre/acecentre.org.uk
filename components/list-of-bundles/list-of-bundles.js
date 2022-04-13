import { Link } from "@material-ui/core";
import styles from "./list-of-bundles.module.css";

export const ListOfBundles = ({ course }) => {
  if (!course.bundles || course.bundles.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2>Included in course bundles:</h2>
      <ul className={styles.list}>
        {course.bundles.map((course) => (
          <Bundle key={course.slug} course={course}></Bundle>
        ))}
      </ul>
    </div>
  );
};

const Bundle = ({ course }) => {
  return (
    <li className={styles.inlineCard}>
      <h3>{course.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: course.shortDescription }}></p>
      <Link href={`/learning/${course.slug}`}>
        <a className={styles.link}>View bundle &gt;</a>
      </Link>
    </li>
  );
};
