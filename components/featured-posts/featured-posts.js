import Link from "next/link";

export const FeaturedPosts = ({ title, viewAllLink, posts }) => {
  return (
    <div>
      {title && <h1>{title}</h1>}
      {viewAllLink && <Link href="viewAllLink">View All</Link>}
      {posts.map((post) => {
        return (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <a>
              <img src="/placeholder.jpeg" />
              <h2>{post.title}</h2>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
