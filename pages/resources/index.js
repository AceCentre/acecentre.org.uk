import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { ResourceCategoriesGrid } from "../../components/resource-categories-grid/resource-categories-grid";
import { ResourceList } from "../../components/resource-list/resource-list";
import { ResourcesSearch } from "../../components/resources-search/resources-search";
import { ResourcesTicks } from "../../components/resources-ticks/resources-ticks";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllProductCategories } from "../../lib/products/get-all-categories";
import { getAllProductsByPopularity } from "../../lib/products/get-products";

import styles from "../../styles/resources.module.css";

export default function Resources({
  popularResources,
  featuredResources,
  productCategories,
}) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <ResourcesSearch />
        <ResourcesTicks />
        <ResourceList title="Popular resources" products={popularResources} />

        <div className={styles.buttonContainer}>
          <Button className={styles.button} href="/resources/all">
            All resources
          </Button>
        </div>
        <ResourceCategoriesGrid productCategories={productCategories} />
        <ResourceList title="Featured resources" products={featuredResources} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allProducts = await getAllProductsByPopularity();
  const popularResources = allProducts.slice(0, 4).map((product) => ({
    title: htmlDecode(product.name),
    mainCategoryName: product.category.name,
    featuredImage: product.image,
    ...product,
  }));
  const productCategories = await getAllProductCategories();

  const featuredResources = allProducts
    .filter((resource) => resource.featured)
    .map((product) => ({
      title: htmlDecode(product.name),
      mainCategoryName: product.category.name,
      featuredImage: product.image,
      ...product,
    }));

  return { props: { popularResources, featuredResources, productCategories } };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
