import {
  Card,
  usePostsWithoutImageCounters,
} from "../latest-from-blog/latest-from-blog";

import styles from "./course-list.module.css";

export const MyCourseList = ({ courses }) => {
  const coursesWithoutImageCounters = usePostsWithoutImageCounters(courses);

  return (
    <div className={`${styles.container}`}>
      <ul className={styles.postList}>
        {coursesWithoutImageCounters.map((course) => {
          return (
            <Card
              ribbonText={course.isTasterSession ? "taster" : ""}
              className={styles.card}
              imageContainerClassName={styles.imageContainer}
              href={course.href}
              key={`my-courses-card-${course.slug}`}
              noImagePostCount={course.noImagePostCount}
              showSubtitle={false}
              featuredImage={course.featuredImage}
              title={course.title}
            >
              <p className={styles.productTitle}>{course.title}</p>
              <p className={styles.date}>{course.date.card}</p>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};
