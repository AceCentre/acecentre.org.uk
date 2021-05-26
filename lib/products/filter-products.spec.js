import { filterProducts } from "./filter-products";

it("only returns the first element when you have a page size of one and select page 2", () => {
  // Arrange
  const firstProduct = { id: 1 };
  const secondProduct = { id: 2 };
  const products = [firstProduct, secondProduct];
  const page = 2;
  const productsPerPage = 1;
  const expected = {
    results: [secondProduct],
    pageCount: 2,
    showNotFound: false,
  };

  // Act
  const result = filterProducts(products, { page, productsPerPage });

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns showNotFound as true if you access a page that is invalid", () => {
  // Arrange
  const firstProduct = { id: 1 };
  const secondProduct = { id: 2 };
  const products = [firstProduct, secondProduct];
  const page = 3;
  const productsPerPage = 1;
  const expected = {
    results: [],
    pageCount: 0,
    showNotFound: true,
  };

  // Act
  const result = filterProducts(products, { page, productsPerPage });

  // Assert
  expect(result).toStrictEqual(expected);
});
