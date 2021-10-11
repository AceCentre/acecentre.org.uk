import { chunk } from "lodash";
import Fuse from "fuse.js";
import { priceRanges } from "./price-range-consts";
import { ORDER_BY_OPTIONS } from "../../components/product-filters/order-by-options";

export const filterProducts = (products, categories, filterParams) => {
  const page = filterParams.page || 1;
  const productsPerPage = filterParams.productsPerPage || 20;
  const searchText = filterParams.searchText || "";
  const category = filterParams.category || null;
  const subcategory = filterParams.subcategory || null;
  const priceRange = filterParams.priceRange || null;
  const orderBy = filterParams.orderBy || ORDER_BY_OPTIONS[0].slug;
  const fullOrderby = ORDER_BY_OPTIONS.find(
    (option) => option.slug === orderBy
  );

  // We will mutate the object as we filter it down
  let filteredProducts = products;

  // If you pass a searchText then we will filter it
  if (searchText) {
    const fuse = new Fuse(filteredProducts, { keys: ["name", "description"] });
    const results = fuse.search(searchText);
    filteredProducts = results.map((result) => result.item);
  }

  let currentCategory = null;

  // Filter by top category
  if (category) {
    currentCategory = categories.find((x) => x.slug == category);
  }

  if (currentCategory) {
    filteredProducts = filteredProducts.filter((product) =>
      currentCategory.productSlugs.includes(product.slug)
    );
  }

  let currentSubCategory = null;

  // Filter by sub category
  if (subcategory && currentCategory) {
    currentSubCategory = currentCategory.subcategories.find(
      (x) => x.slug === subcategory
    );
  }

  if (currentSubCategory) {
    filteredProducts = filteredProducts.filter((product) =>
      currentSubCategory.productSlugs.includes(product.slug)
    );
  }

  let currentPriceRangeMeta = null;

  if (priceRange) {
    currentPriceRangeMeta = priceRanges.find((x) => x.slug === priceRange);
  }

  if (currentPriceRangeMeta) {
    filteredProducts = filteredProducts.filter((product) => {
      let prices = [];

      if (product.price !== null) {
        prices.push(product.price);
      }

      if (product.variations) {
        for (const currentVariation of product.variations) {
          prices.push(currentVariation.price);
        }
      }

      const results = prices.map(
        (price) =>
          price >= currentPriceRangeMeta.min &&
          price < currentPriceRangeMeta.max
      );

      const result = results.reduce((acc, current) => acc || current, false);

      return result;
    });
  }

  filteredProducts = filteredProducts.sort(fullOrderby.sort);

  const paginatedProducts = chunk(filteredProducts, productsPerPage);
  const zeroIndexedPage = page - 1;
  const results = paginatedProducts[zeroIndexedPage];

  if (results === undefined) {
    return {
      results: [],
      pageCount: 0,
      totalResourcesCount: 0,
      showNotFound: true,
    };
  }

  return {
    results: paginatedProducts[zeroIndexedPage],
    pageCount: paginatedProducts.length,
    showNotFound: false,
    totalResourcesCount: filteredProducts.length,
  };
};
