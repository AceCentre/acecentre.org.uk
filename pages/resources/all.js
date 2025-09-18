import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { Pagination } from "../../components/pagination/pagination";
import { ORDER_BY_OPTIONS } from "../../components/product-filters/order-by-options";
import { ProductFilters } from "../../components/product-filters/product-filters";
import { ResourceList } from "../../components/resource-list/resource-list";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { filterProducts } from "../../lib/products/filter-products";
import { getAllProductCategories } from "../../lib/products/get-all-categories";
import { getAllProducts } from "../../lib/products/get-products";

export default function AllResources({
  resources,
  currentPage,
  pageCount,
  searchText,
  totalResourcesCount,
  productCategories,
  selectedSubcategory,
  selectedCategory,
  selectedCategoryDesc,
  selectedPriceRange,
  selectedOrderBy,
}) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <ProductFilters
          selectedCategory={selectedCategory}
          selectedCategoryDesc={selectedCategoryDesc}
          selectedSubCategory={selectedSubcategory}
          selectedPriceRange={selectedPriceRange}
          selectedOrderBy={selectedOrderBy}
          categories={productCategories}
          resourceCount={totalResourcesCount}
          searchText={searchText}
        />
        <ResourceList showPrice products={resources} />
        <Pagination currentPage={currentPage} pageCount={pageCount} />
      </main>
      <Footer />
    </>
  );
}

// This will run every page run
export const getServerSideProps = async (req) => {
  const page = req.query.page || 1;
  const searchText = req.query.searchText || "";
  const category = req.query.category || "";
  const subcategory = req.query.subcategory || "";
  const priceRange = req.query.pricerange || "";
  const orderBy = req.query.orderby || ORDER_BY_OPTIONS[0].slug;
  const productsPerPage = 20;

  // Temporary fallback while WPGraphQL is having issues
  let products = [];
  let productCategories = [];
  let fullCategories = [];

  try {
    products = await getAllProducts();
    const categoriesData = await getAllProductCategories();
    productCategories = categoriesData.slugs;
    fullCategories = categoriesData.fullCategories;
  } catch (error) {
    console.error("GraphQL request failed:", error);
    // Return empty data to prevent 500 error
  }

  const {
    results: filteredProducts,
    pageCount,
    totalResourcesCount,
  } = filterProducts(products, productCategories, {
    page,
    productsPerPage,
    searchText,
    category,
    subcategory,
    priceRange,
    orderBy,
  });

  const resources = filteredProducts.map((product) => ({
    title: htmlDecode(product.name),
    mainCategoryName: product.category.name,
    featuredImage: product.image,
    ...product,
  }));

  let selectedCategoryDesc = "";
  let currentFullCategory = fullCategories.find((x) => x.slug == category);

  if (currentFullCategory) {
    selectedCategoryDesc = currentFullCategory.description;
  }

  return {
    props: {
      resources,
      pageCount,
      currentPage: page,
      searchText,
      totalResourcesCount,
      productCategories,
      selectedCategory: category,
      selectedCategoryDesc,
      selectedSubcategory: subcategory,
      selectedPriceRange: priceRange,
      selectedOrderBy: orderBy,
      seo: {
        title: "Resources",
        description:
          "Discover a wide range of resources, publications and downloads to support use and implementation of AAC and AT",
      },
    },
  };
};

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
