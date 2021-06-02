import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { Pagination } from "../../components/pagination/pagination";
import { ProductFilters } from "../../components/product-filters/product-filters";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { filterProducts } from "../../lib/products/filter-products";
import { getAllProductCategories } from "../../lib/products/get-all-categories";
import { getAllProducts } from "../../lib/products/get-products";
import { readFromStaticCacheWithFallback } from "../../lib/static-caching/read";

export default function AllResources({
  resources,
  currentPage,
  pageCount,
  searchText,
  totalResourcesCount,
  productCategories,
  selectedSubcategory,
  selectedCategory,
  selectedPriceRange,
}) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <ProductFilters
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubcategory}
          selectedPriceRange={selectedPriceRange}
          categories={productCategories}
          resourceCount={totalResourcesCount}
          searchText={searchText}
        />
        <FeaturedPosts linkPrefix="resources" posts={resources} />
        <Pagination currentPage={currentPage} pageCount={pageCount} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const CACHE_KEY_PRODUCTS = "PRODUCTS_FILTER";
const CACHE_KEY_PRODUCT_CATEGORIES = "PRODUCT_CATEGORIES";

// This will run every page run
export const getServerSideProps = withGlobalProps(async (req) => {
  const page = req.query.page || 1;
  const searchText = req.query.searchText || "";
  const category = req.query.category || "";
  const subcategory = req.query.subcategory || "";
  const priceRange = req.query.pricerange || "";
  const productsPerPage = 20;

  const products = await readFromStaticCacheWithFallback(
    CACHE_KEY_PRODUCTS,
    async () => {
      return await getAllProducts();
    }
  );

  const productCategories = await readFromStaticCacheWithFallback(
    CACHE_KEY_PRODUCT_CATEGORIES,
    async () => {
      return await getAllProductCategories();
    }
  );

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
  });

  const resources = filteredProducts.map((product) => ({
    title: product.name,
    ...product,
  }));
  return {
    props: {
      resources,
      pageCount,
      currentPage: page,
      searchText,
      totalResourcesCount,
      productCategories,
      selectedCategory: category,
      selectedSubcategory: subcategory,
      selectedPriceRange: priceRange,
    },
  };
});
