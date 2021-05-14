import { AllCategories } from "../../components/all-categories/all-categories";
import { BlogCategoryGrid } from "../../components/blog-category-grid/blog-category-grid";
import { BlogSearch } from "../../components/blog-search/blog-search";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllPostCards } from "../../lib/posts/get-posts";

export default function Home({ latestsPosts }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
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

  if (!latestsPosts) throw new Error("couldnt get latests posts");

  return { props: { latestsPosts: latestsPosts.slice(0, 6) } };
});

const blogCategories = [
  { href: "/blog/category/1", title: "Category One" },
  { href: "/blog/category/2", title: "Category Two" },
  { href: "/blog/category/3", title: "Category Three" },
  { href: "/blog/category/4", title: "Category Four" },
  { href: "/blog/category/5", title: "Category Five" },
  { href: "/blog/category/6", title: "Category Six" },
  { href: "/blog/category/7", title: "Category Seven" },
  { href: "/blog/category/8", title: "Category Eight" },
  { href: "/blog/category/9", title: "Category Nine" },
  { href: "/blog/category/10", title: "Category Ten" },
  { href: "/blog/category/11", title: "Category Eleven" },
  { href: "/blog/category/12", title: "Category Twelve" },
  { href: "/blog/category/13", title: "Category Three" },
  { href: "/blog/category/14", title: "Category Fourteen" },
];
