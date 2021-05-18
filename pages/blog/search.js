import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllFullPosts } from "../../lib/posts/get-posts";
import { useQueryParamSearch } from "../../lib/use-search";

export default function SearchBlog({ allPosts }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();
  const {
    loading,
    filteredList: filteredPosts,
    searchText,
  } = useQueryParamSearch(allPosts, ["content", "title"], "searchText");

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        {loading ? (
          <p>Searching......</p>
        ) : (
          <FeaturedPosts
            title={`Results for: "${searchText}"`}
            posts={filteredPosts}
          />
        )}
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allPosts = await getAllFullPosts();

  return { props: { allPosts } };
});
