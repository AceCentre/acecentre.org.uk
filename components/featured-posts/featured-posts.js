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
}) => {
  const postsWithoutImageCounters = usePostsWithoutImageCounters(posts);

  return (
    <div className={styles.container}>
      {title && <h1>{title}</h1>}
      {viewAllLink && <Link href={viewAllLink}>View All</Link>}
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
