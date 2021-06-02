import { filterProducts } from "./filter-products";

it("only returns the first element when you have a page size of one and select page 2", () => {
  // Arrange
  const firstProduct = { id: 1 };
  const secondProduct = { id: 2 };
  const products = [firstProduct, secondProduct];
  const page = 2;
  const productsPerPage = 1;
  const categories = [];
  const expected = {
    results: [secondProduct],
    pageCount: 2,
    showNotFound: false,
    totalResourcesCount: 2,
  };

  // Act
  const result = filterProducts(products, categories, {
    page,
    productsPerPage,
  });

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
  const categories = [];
  const expected = {
    results: [],
    pageCount: 0,
    showNotFound: true,
    totalResourcesCount: 0,
  };

  // Act
  const result = filterProducts(products, categories, {
    page,
    productsPerPage,
  });

  // Assert
  expect(result).toStrictEqual(expected);
});

it("does a free text search on the name", () => {
  // Arrange
  const searchText = "Yes";
  const firstProduct = { id: 1, name: searchText };
  const secondProduct = { id: 2, name: "No" };
  const products = [firstProduct, secondProduct];
  const page = 1;
  const productsPerPage = 2;
  const categories = [];
  const expected = {
    results: [firstProduct],
    pageCount: 1,
    showNotFound: false,
    totalResourcesCount: 1,
  };

  // Act
  const result = filterProducts(products, categories, {
    page,
    productsPerPage,
    searchText,
  });

  // Assert
  expect(result).toStrictEqual(expected);
});

it("search products in a category", () => {
  // Arrange
  const firstProduct = { id: 1, name: "One", slug: "One" };
  const secondProduct = { id: 2, name: "Two", slug: "Two" };
  const products = [firstProduct, secondProduct];
  const page = 1;
  const productsPerPage = 2;
  const categories = [{ slug: "first", productSlugs: ["One"] }];
  const expected = {
    results: [firstProduct],
    pageCount: 1,
    showNotFound: false,
    totalResourcesCount: 1,
  };

  // Act
  const result = filterProducts(products, categories, {
    page,
    productsPerPage,
    category: "first",
  });

  // Assert
  expect(result).toStrictEqual(expected);
});

it("search products in a category", () => {
  // Arrange
  const firstProduct = { id: 1, name: "One", slug: "One" };
  const secondProduct = { id: 2, name: "Two", slug: "Two" };
  const products = [firstProduct, secondProduct];
  const page = 1;
  const productsPerPage = 2;
  const categories = [
    {
      slug: "first",
      productSlugs: ["One", "Two"],
      subcategories: [{ slug: "Sub", productSlugs: ["Two"] }],
    },
  ];
  const expected = {
    results: [secondProduct],
    pageCount: 1,
    showNotFound: false,
    totalResourcesCount: 1,
  };

  // Act
  const result = filterProducts(products, categories, {
    page,
    productsPerPage,
    category: "first",
    subcategory: "Sub",
  });

  // Assert
  expect(result).toStrictEqual(expected);
});
