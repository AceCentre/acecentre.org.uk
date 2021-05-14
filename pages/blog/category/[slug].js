import { Footer } from "../../../components/footer/footer";
import { Nav } from "../../../components/nav/nav";
import { defaultNavItems, SubNav } from "../../../components/sub-nav/sub-nav";
import { useCartCount } from "../../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";
import { getAllCategories } from "../../../lib/posts/get-categories";
import { getAllPostsForCategory } from "../../../lib/posts/get-posts";
import { readFromStaticCache } from "../../../lib/static-caching/read";
import { writeToStaticCache } from "../../../lib/static-caching/write";

export default function CategoryPage({ ...allProps }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <pre>{JSON.stringify(allProps, null, 2)}</pre>
      </main>

      <Footer currentYear={currentYear} />
    </>
  );
}

const CACHE_KEY = "blogCategories";

export async function getStaticPaths() {
  const blogCategories = await getAllCategories();

  if (!blogCategories) throw new Error("Couldn't get categories");

  writeToStaticCache(CACHE_KEY, blogCategories);

  return {
    paths: blogCategories.map((category) => ({
      params: { slug: category.slug },
    })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  console.log(slug);

  const blogCategories = readFromStaticCache(CACHE_KEY);
  const currentCategory = blogCategories.find(
    (category) => category.slug === slug
  );

  const posts = await getAllPostsForCategory(currentCategory.title);

  return { props: { category: currentCategory, posts } };
});
