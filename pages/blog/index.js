import { BlogCategoryGrid } from "../../components/blog-category-grid/blog-category-grid";
import { BlogSearch } from "../../components/blog-search/blog-search";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { getAllCategories } from "../../lib/posts/get-categories";
import { getAllPostCards } from "../../lib/posts/get-posts";

import styles from "../../styles/blog.module.css";

export default function Home({ latestsPosts, blogCategories }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BlogSearch />
        <FeaturedPosts
          className={styles.featuredPosts}
          title="Latest articles"
          posts={latestsPosts}
        />
        <BlogCategoryGrid blogCategories={blogCategories} />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const isEventPost = (post) =>
    Array.isArray(post?.categories) &&
    post.categories.some((c) => c?.slug === "events");

  const latestsPosts = (await getAllPostCards()).filter(
    (x) => x.mainCategoryName !== "AT Scholar" && !isEventPost(x)
  );

  if (!latestsPosts) throw new Error("Couldn't get latests posts");

  const blogCategories = (await getAllCategories()).filter(
    (x) => x.slug !== "at-scholar" && x.slug !== "events"
  );
  if (!blogCategories) throw new Error("Couldn't get the blog categories");

  return {
    revalidate: 60,
    props: {
      latestsPosts: latestsPosts.slice(0, 6),
      blogCategories,
      seo: {
        title: "Blog",
        description:
          "Keep up to date with news on what we're up to and how you can get involved",
      },
    },
  };
};
