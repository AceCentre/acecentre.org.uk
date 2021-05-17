import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllPostCards } from "../../lib/posts/get-posts";

export default function CategoryPage() {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main></main>

      <Footer currentYear={currentYear} />
    </>
  );
}

export async function getStaticPaths() {
  const allPosts = await getAllPostCards();

  return {
    paths: allPosts.map((post) => ({ params: { post: post.slug } })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps();
