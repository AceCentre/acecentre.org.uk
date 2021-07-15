import Link from "next/link";
import {
  BlogCard,
  usePostsWithoutImageCounters,
} from "../latest-from-blog/latest-from-blog";

import styles from "./featured-posts.module.css";

export const FeaturedPosts = ({
  title,
  viewAllLink,
  viewAllText = "View all",
  posts,
  linkPrefix = "blog",
  className = "",
  smallCards = false,
}) => {
  const postsWithoutImageCounters = usePostsWithoutImageCounters(posts);

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
        {postsWithoutImageCounters.map((post) => {
          return (
            <BlogCard
              key={`card-${post.slug}`}
              category={post.mainCategoryName}
              post={post}
              linkPrefix={linkPrefix}
              smallCards={smallCards}
            />
          );
        })}
      </ul>
    </div>
  );
};
