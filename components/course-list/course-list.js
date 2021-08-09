import Link from "next/link";
import {
  Card,
  usePostsWithoutImageCounters,
} from "../latest-from-blog/latest-from-blog";

import styles from "./course-list.module.css";

export const CourseList = ({
  title,
  viewAllLink,
  viewAllText = "View all",
  products,
  showDate = false,
  className = "",
}) => {
  const productsWithoutImageCounters = usePostsWithoutImageCounters(products);

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.titleContainer}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {viewAllLink && (
          <Link href={viewAllLink}>
            <a className={styles.viewAllLink}>{viewAllText} &gt;</a>
          </Link>
        )}
      </div>
      <ul className={styles.postList}>
        {productsWithoutImageCounters.map((product) => {
          return (
            <Card
              className={styles.card}
              imageContainerClassName={styles.imageContainer}
              href={`/learning/${product.slug}`}
              key={`${title}-card-${product.slug}`}
              noImagePostCount={product.noImagePostCount}
              subtitle={product.mainCategoryName}
              featuredImage={product.featuredImage}
              title={product.title}
            >
              <p className={styles.productTitle}>{product.title}</p>
              {showDate && <p className={styles.date}>{product.date.card}</p>}
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

export const MyCourseList = ({ courses }) => {
  const coursesWithoutImageCounters = usePostsWithoutImageCounters(courses);

  return (
    <div className={`${styles.container}`}>
      <ul className={styles.postList}>
        {coursesWithoutImageCounters.map((course) => {
          return (
            <Card
              className={styles.card}
              imageContainerClassName={styles.imageContainer}
              href={course.href}
              key={`my-courses-card-${course.slug}`}
              noImagePostCount={course.noImagePostCount}
              subtitle={course.mainCategoryName}
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
