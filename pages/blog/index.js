import { AllCategories } from "../../components/all-categories/all-categories";
import { BlogCategoryGrid } from "../../components/blog-category-grid/blog-category-grid";
import { BlogSearch } from "../../components/blog-search/blog-search";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllCategories } from "../../lib/posts/get-categories";
import { getAllPostCards } from "../../lib/posts/get-posts";

export default function Home({ latestsPosts, blogCategories }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />;
      </header>
      <main>
        <BlogSearch />
        <FeaturedPosts title="Latest posts" posts={latestsPosts} />
        <BlogCategoryGrid />
        <AllCategories blogCategories={blogCategories} />
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

  return { props: { latestsPosts: latestsPosts.slice(0, 6), blogCategories } };
});
