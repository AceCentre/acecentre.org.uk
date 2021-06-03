import Link from "next/link";
import { FeaturedPosts } from "../../../components/featured-posts/featured-posts";
import { Footer } from "../../../components/footer/footer";
import { Nav } from "../../../components/nav/nav";
import { PageTitle } from "../../../components/page-title/page-title";
import { defaultNavItems, SubNav } from "../../../components/sub-nav/sub-nav";
import { useCartCount } from "../../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";
import { getAllCategories } from "../../../lib/posts/get-categories";
import { getAllPostsForCategory } from "../../../lib/posts/get-posts";
import { readFromStaticCache } from "../../../lib/static-caching/read";
import { writeToStaticCache } from "../../../lib/static-caching/write";
import styles from "../../../styles/index.module.css";

export default function CategoryPage({ posts, category }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <div className={styles.container}>
          <Link href="/blog">&lt; Back to blog</Link>
        </div>
        <PageTitle description={category.title} heading="From the blog" />
        <FeaturedPosts posts={posts} />
      </main>

      <Footer currentYear={currentYear} />
    </>
  );
}

const CACHE_KEY = "blogCategories";

export async function getStaticPaths() {
  const blogCategories = await getAllCategories();

  if (!blogCategories) throw new Error("Couldn't get categories");

  await writeToStaticCache(CACHE_KEY, blogCategories);

  return {
    paths: blogCategories.map((category) => ({
      params: { slug: category.slug },
    })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const blogCategories = await readFromStaticCache(CACHE_KEY);
  const currentCategory = blogCategories.find(
    (category) => category.slug === slug
  );

  const posts = await getAllPostsForCategory(currentCategory.title);

  return { props: { category: currentCategory, posts } };
});
