import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllFullPosts } from "../../lib/posts/get-posts";
import { readFromStaticCache } from "../../lib/static-caching/read";
import { writeToStaticCache } from "../../lib/static-caching/write";

export default function CategoryPage({ currentPost }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <pre>{JSON.stringify(currentPost, null, 2)}</pre>
      </main>

      <Footer currentYear={currentYear} />
    </>
  );
}

const cacheKey = "ALL_FULL_POSTS";

export async function getStaticPaths() {
  const allPosts = await getAllFullPosts();

  writeToStaticCache(cacheKey, allPosts);

  return {
    paths: allPosts.map((post) => ({ params: { post: post.slug } })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(
  async ({ params: { post: postSlug } }) => {
    const allPosts = readFromStaticCache(cacheKey);
    const currentPost = allPosts.find((post) => post.slug === postSlug);

    return { props: { currentPost } };
  }
);
