import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { ResourceCategoriesHighlight } from "../../components/resource-categories-highlight/resource-categories-highlight";
import { ResourcesSearch } from "../../components/resources-search/resources-search";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllProductsByPopularity } from "../../lib/products/get-products";

export default function Resources({ popularResources }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <ResourcesSearch />
        <FeaturedPosts
          linkPrefix="resources"
          title="Popular resources"
          posts={popularResources}
        />
        <ResourceCategoriesHighlight />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allProducts = await getAllProductsByPopularity();
  const popularResources = allProducts.slice(0, 4).map((product) => ({
    title: product.name,
    ...product,
  }));

  return { props: { popularResources } };
});
