import Link from "next/link";

import styles from "./featured-posts.module.css";

export const FeaturedPosts = ({ title, viewAllLink, posts }) => {
  return (
    <div className={styles.container}>
      {title && <h1>{title}</h1>}
      {viewAllLink && <Link href={viewAllLink}>View All</Link>}
      <div className={styles.postList}>
        {posts.map((post) => {
          return (
            // Should this be a list?
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <a>
                <img alt="placeholder" width="100%" src="/placeholder.jpeg" />
                <h2>{post.title}</h2>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
