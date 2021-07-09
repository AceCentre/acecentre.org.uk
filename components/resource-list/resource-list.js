import Link from "next/link";
import {
  Card,
  usePostsWithoutImageCounters,
} from "../latest-from-blog/latest-from-blog";

import styles from "./resource-list.module.css";

export const ResourceList = ({
  title,
  viewAllLink,
  viewAllText = "View all",
  products,
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
              href={`/resources/${product.slug}`}
              key={`${title}-card-${product.slug}`}
              noImagePostCount={product.noImagePostCount}
              subtitle={product.mainCategoryName}
              featuredImage={product.featuredImage}
              title={product.title}
            >
              <p className={styles.productTitle}>{product.title}</p>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};
