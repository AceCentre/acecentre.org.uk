import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getFullProjects } from "../../lib/posts/get-posts";
import { useQueryParamSearch } from "../../lib/use-search";

export default function SearchProjects({ allProjects }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  const {
    loading,
    filteredList: filteredProjects,
    searchText,
  } = useQueryParamSearch(allProjects, ["content", "title"], "searchText");

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
            posts={filteredProjects}
          />
        )}
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allProjects = await getFullProjects();

  if (!allProjects) throw new Error("Could not get all the projects");

  return { props: { allProjects } };
});
