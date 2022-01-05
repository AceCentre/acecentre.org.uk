import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { ResourceCategoriesGrid } from "../../components/resource-categories-grid/resource-categories-grid";
import { ResourceList } from "../../components/resource-list/resource-list";
import { ResourcesSearch } from "../../components/resources-search/resources-search";
import { ResourcesTicks } from "../../components/resources-ticks/resources-ticks";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
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
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <ResourcesSearch />
        <ResourcesTicks />
        <ResourceList
          className={styles.featuredResources}
          title="Featured resources"
          products={featuredResources}
          viewAllLink="/resources/all"
          viewAllText="View all resources"
        />

        <ResourceCategoriesGrid productCategories={productCategories} />
        <div className={styles.buttonContainer}>
          <Button className={styles.button} href="/resources/all">
            View all resources
          </Button>
        </div>
        <ResourceList
          className={styles.resourcesList}
          title="Popular resources"
          products={popularResources}
          viewAllLink="/resources/all"
          viewAllText="View all resources"
        />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const DECEMBER = 11;

export const getStaticProps = withGlobalProps(async () => {
  const allProducts = await getAllProductsByPopularity();
  const popularResources = allProducts.slice(0, 4).map((product) => ({
    title: htmlDecode(product.name),
    mainCategoryName: product.category.name,
    featuredImage: product.image,
    ...product,
  }));

  const currentMonth = new Date().getMonth();
  const productCategories = await getAllProductCategories();
  const filteredProductCategories = productCategories.filter((current) => {
    // Only show seasonal category during december
    if (current.slug !== "seasonal") return true;
    if (currentMonth === DECEMBER) return true;

    return false;
  });

  const featuredResources = allProducts
    .filter((resource) => resource.featured)
    .map((product) => ({
      title: htmlDecode(product.name),
      mainCategoryName: product.category.name,
      featuredImage: product.image,
      ...product,
    }));

  return {
    props: {
      popularResources,
      featuredResources,
      productCategories: filteredProductCategories,
      seo: {
        title: "Resources",
        description:
          "Discover a wide range of resources, publications and downloads to support use and implementation of AAC and AT",
      },
    },
  };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
