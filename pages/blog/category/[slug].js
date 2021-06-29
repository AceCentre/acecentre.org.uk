import { FeaturedPosts } from "../../../components/featured-posts/featured-posts";
import { Footer } from "../../../components/footer/footer";
import { PageTitle } from "../../../components/page-title/page-title";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { useCartCount } from "../../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";
import { getAllCategories } from "../../../lib/posts/get-categories";
import { getAllPostsForCategory } from "../../../lib/posts/get-posts";
import { readFromStaticCache } from "../../../lib/static-caching/read";
import { writeToStaticCache } from "../../../lib/static-caching/write";
import styles from "../../../styles/index.module.css";
import redis from "../../../lib/static-caching/redis";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";

export default function CategoryPage({ posts, category }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle description={category.title} heading="Ace Centre blog" />
        <p className={styles.container}>{posts.length} articles</p>
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

  await writeToStaticCache(CACHE_KEY, blogCategories, redis);

  return {
    paths: blogCategories.map((category) => ({
      params: { slug: category.slug },
    })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const blogCategories = await readFromStaticCache(CACHE_KEY, redis);
  const currentCategory = blogCategories.find(
    (category) => category.slug === slug
  );

  const posts = await getAllPostsForCategory(currentCategory.title);

  return { props: { category: currentCategory, posts } };
});
