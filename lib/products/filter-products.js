import { chunk } from "lodash";

export const filterProducts = (products, filterParams) => {
  const page = filterParams.page || 1;
  const productsPerPage = filterParams.productsPerPage || 20;

  const paginatedProducts = chunk(products, productsPerPage);

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
