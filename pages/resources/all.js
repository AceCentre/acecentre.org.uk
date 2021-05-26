import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { filterProducts } from "../../lib/products/filter-products";
import { getAllProducts } from "../../lib/products/get-products";
import { readFromStaticCache } from "../../lib/static-caching/read";
import { writeToStaticCache } from "../../lib/static-caching/write";

export default function AllResources({
  resources,
  currentPage,
  pageCount,
  searchText,
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
        {searchText && <p>You searched for {searchText}</p>}
        <p>
          {currentPage} of {pageCount}
        </p>
        <FeaturedPosts linkPrefix="resources" posts={resources} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const CACHE_KEY = "PRODUCTS_FILTER";

// This will run every page run
export const getServerSideProps = withGlobalProps(async (req) => {
  const page = req.query.page || 1;
  const searchText = req.query.searchText || "";
  const productsPerPage = 20;

  // Get the products from the static cache, if they
  // aren't there, fetch them then store them in static
  // cache. Most pages will be rendered fast, the occasional
  // will end up being slow.
  let products = await readFromStaticCache(CACHE_KEY);
  if (!products) {
    const fetchedProducts = await getAllProducts();
    writeToStaticCache(CACHE_KEY, fetchedProducts);
    products = fetchedProducts;
  }

  const { results: filteredProducts, pageCount, showNotFound } = filterProducts(
    products,
    {
      page,
      productsPerPage,
      searchText,
    }
  );

  if (showNotFound) {
    return {
      notFound: true,
    };
  }

  const resources = filteredProducts.map((product) => ({
    title: product.name,
    ...product,
  }));
  return { props: { resources, pageCount, currentPage: page, searchText } };
});
