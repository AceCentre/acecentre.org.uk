import { BlogCategoryGrid } from "../../components/blog-category-grid/blog-category-grid";
import { BlogSearch } from "../../components/blog-search/blog-search";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllCategories } from "../../lib/posts/get-categories";
import { getAllPostCards } from "../../lib/posts/get-posts";

import styles from "../../styles/blog.module.css";

export default function Home({ latestsPosts, blogCategories }) {
  const { currentYear } = useGlobalProps();

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
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const latestsPosts = await getAllPostCards();

  if (!latestsPosts) throw new Error("Couldn't get latests posts");

  const blogCategories = await getAllCategories();

  if (!blogCategories) throw new Error("Couldn't get the blog categories");

  return {
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
});
