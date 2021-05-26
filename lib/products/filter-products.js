import { chunk } from "lodash";

export const filterProducts = (products, filterParams) => {
  const page = filterParams.page || 1;
  const productsPerPage = filterParams.productsPerPage || 20;

  const paginatedProducts = chunk(products, productsPerPage);

  const zeroIndexedPage = page - 1;

  return {
    results: paginatedProducts[zeroIndexedPage],
    pageCount: paginatedProducts.length,
  };
};
