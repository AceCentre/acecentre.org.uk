import Link from "next/link";
import {
  Card,
  usePostsWithoutImageCounters,
} from "../latest-from-blog/latest-from-blog";
import {
  CourseMeta,
  LearningLevel,
} from "../learning-detail-box/learning-detail-box";

import styles from "./course-list.module.css";

export const CourseList = ({
  title,
  viewAllLink,
  viewAllText = "View all",
  products,
  showDate = false,
  className = "",
  withMeta = false,
  threeWide = false,
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
              className={`${styles.card} ${threeWide ? styles.threeWide : ""}`}
              imageContainerClassName={styles.imageContainer}
              href={`/learning/${product.slug}`}
              key={`${title}-card-${product.slug}`}
              noImagePostCount={product.noImagePostCount}
              subtitle={product.mainCategoryName}
              featuredImage={product.featuredImage}
              title={product.title}
            >
              <p className={styles.productTitle}>{product.title}</p>
              <div className={styles.bottomSectionOfCard}>
                <div className={styles.learningLevelContainer}>
                  <LearningLevel course={product} size={10} />
                </div>
                {withMeta ? (
                  <CourseMeta course={product} withCost />
                ) : (
                  <>
                    {showDate && (
                      <p className={styles.date}>{product.date.card}</p>
                    )}
                  </>
                )}
              </div>
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
