import { chunk } from "lodash";
import Fuse from "fuse.js";

export const filterProducts = (products, filterParams) => {
  const page = filterParams.page || 1;
  const productsPerPage = filterParams.productsPerPage || 20;
  const searchText = filterParams.searchText || "";

  // We will mutate the object as we filter it down
  let filteredProducts = products;

  // If you pass a searchText then we will filter it
  if (searchText) {
    const fuse = new Fuse(filteredProducts, { keys: ["name", "description"] });
    const results = fuse.search(searchText);
    filteredProducts = results.map((result) => result.item);
  }

  const paginatedProducts = chunk(filteredProducts, productsPerPage);

  const zeroIndexedPage = page - 1;
  const results = paginatedProducts[zeroIndexedPage];

  if (results === undefined) {
    return {
      results: [],
      pageCount: 0,
      showNotFound: true,
    };
  }

  return {
    results: paginatedProducts[zeroIndexedPage],
    pageCount: paginatedProducts.length,
    showNotFound: false,
  };
};
