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

it("search products in a sub category", () => {
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

it("filter products by price", () => {
  // Arrange
  const firstProduct = { id: 1, name: "One", slug: "One", price: 0 };
  const secondProduct = { id: 2, name: "Two", slug: "Two", price: 100 };
  const products = [firstProduct, secondProduct];
  const page = 1;
  const productsPerPage = 2;
  const categories = [];
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
    priceRange: "paid",
  });

  // Assert
  expect(result).toStrictEqual(expected);
});

it("default sorts products by date (newest)", () => {
  // Arrange
  const firstProduct = {
    id: 1,
    name: "One",
    slug: "One",
    price: 0,
    date: "2018-06-14T10:32:35.505Z",
  };
  const secondProduct = {
    id: 2,
    name: "Two",
    slug: "Two",
    price: 100,
    date: "2021-06-14T10:32:35.505Z",
  };
  const products = [firstProduct, secondProduct];
  const categories = [];
  const expected = {
    results: [secondProduct, firstProduct],
    pageCount: 1,
    showNotFound: false,
    totalResourcesCount: 2,
  };

  // Act
  const result = filterProducts(products, categories, {});

  // Assert
  expect(result).toStrictEqual(expected);
});

it("sorts products by date (oldest)", () => {
  // Arrange
  const firstProduct = {
    id: 1,
    name: "One",
    slug: "One",
    price: 0,
    date: "2021-06-14T10:32:35.505Z",
  };
  const secondProduct = {
    date: "2018-06-14T10:32:35.505Z",
    id: 2,
    name: "Two",
    slug: "Two",
    price: 100,
  };
  const products = [firstProduct, secondProduct];
  const categories = [];
  const expected = {
    results: [secondProduct, firstProduct],
    pageCount: 1,
    showNotFound: false,
    totalResourcesCount: 2,
  };

  // Act
  const result = filterProducts(products, categories, { orderBy: "oldest" });

  // Assert
  expect(result).toStrictEqual(expected);
});

it("sorts products by alphabet (a - z)", () => {
  // Arrange
  const firstProduct = {
    id: 1,
    name: "z",
    slug: "One",
    price: 0,
    date: "2021-06-14T10:32:35.505Z",
  };
  const secondProduct = {
    date: "2018-06-14T10:32:35.505Z",
    id: 2,
    name: "a",
    slug: "Two",
    price: 100,
  };
  const products = [firstProduct, secondProduct];
  const categories = [];
  const expected = {
    results: [secondProduct, firstProduct],
    pageCount: 1,
    showNotFound: false,
    totalResourcesCount: 2,
  };

  // Act
  const result = filterProducts(products, categories, {
    orderBy: "alphabetical",
  });

  // Assert
  expect(result).toStrictEqual(expected);
});

it("sorts products by alphabet (z - a)", () => {
  // Arrange
  const firstProduct = {
    id: 1,
    name: "a",
    slug: "One",
    price: 0,
    date: "2021-06-14T10:32:35.505Z",
  };
  const secondProduct = {
    date: "2018-06-14T10:32:35.505Z",
    id: 2,
    name: "z",
    slug: "Two",
    price: 100,
  };
  const products = [firstProduct, secondProduct];
  const categories = [];
  const expected = {
    results: [secondProduct, firstProduct],
    pageCount: 1,
    showNotFound: false,
    totalResourcesCount: 2,
  };

  // Act
  const result = filterProducts(products, categories, {
    orderBy: "alphabetical-reverse",
  });

  // Assert
  expect(result).toStrictEqual(expected);
});

it("sorts products by price (lowest)", () => {
  // Arrange
  const firstProduct = {
    id: 1,
    name: "a",
    slug: "One",
    price: 100,
    date: "2021-06-14T10:32:35.505Z",
  };
  const secondProduct = {
    date: "2018-06-14T10:32:35.505Z",
    id: 2,
    name: "z",
    slug: "Two",
    price: 0,
  };
  const products = [firstProduct, secondProduct];
  const categories = [];
  const expected = {
    results: [secondProduct, firstProduct],
    pageCount: 1,
    showNotFound: false,
    totalResourcesCount: 2,
  };

  // Act
  const result = filterProducts(products, categories, {
    orderBy: "price-lowest",
  });

  // Assert
  expect(result).toStrictEqual(expected);
});

it("sorts products by price (highest)", () => {
  // Arrange
  const firstProduct = {
    id: 1,
    name: "a",
    slug: "One",
    price: 0,
    date: "2021-06-14T10:32:35.505Z",
  };
  const secondProduct = {
    date: "2018-06-14T10:32:35.505Z",
    id: 2,
    name: "z",
    slug: "Two",
    price: 100,
  };
  const products = [firstProduct, secondProduct];
  const categories = [];
  const expected = {
    results: [secondProduct, firstProduct],
    pageCount: 1,
    showNotFound: false,
    totalResourcesCount: 2,
  };

  // Act
  const result = filterProducts(products, categories, {
    orderBy: "price-highest",
  });

  // Assert
  expect(result).toStrictEqual(expected);
});
