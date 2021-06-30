import Link from "next/link";
import {
  BlogCard,
  usePostsWithoutImageCounters,
} from "../latest-from-blog/latest-from-blog";

import styles from "./featured-posts.module.css";

export const FeaturedPosts = ({
  title,
  viewAllLink,
  posts,
  linkPrefix = "blog",
  className = "",
}) => {
  const postsWithoutImageCounters = usePostsWithoutImageCounters(posts);

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.titleContainer}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {viewAllLink && (
          <Link href={viewAllLink}>
            <a className={styles.viewAllLink}>View all &gt;</a>
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
            />
          );
        })}
      </ul>
    </div>
  );
};
