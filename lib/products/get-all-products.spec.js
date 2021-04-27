import nock from "nock";
import { getAllProducts } from "./get-products";

it("returns an empty array if there are no products", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [],
      },
    },
  };
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual([]);
});

it("throws an error if there are more products than we query for", async () => {
  // Arrange
  let nodes = [];
  for (let i = 0; i < 1001; i++) {
    nodes.push({
      slug: `node-${i}`,
    });
  }
  const mockResponse = {
    data: {
      products: {
        nodes,
      },
    },
  };
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act and Assert
  await expect(getAllProducts()).rejects.toThrow(
    "There are more products than we requested"
  );
});

it("gets all the slugs and names for each product", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            price: null,
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: 0,
      gallery: [],
      image: null,
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns a list of variations", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "ABC with core words",
            variations: {
              nodes: [
                {
                  name: "ABC with core words - Word",
                  price: null,
                },
                {
                  name: "ABC with core words - PDF",
                  price: null,
                },
              ],
            },
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "ABC with core words",
      price: 0,
      variations: [
        { name: "Word", price: 0 },
        { name: "PDF", price: 0 },
      ],
      gallery: [],
      image: null,
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns price as an int when returned null", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            price: null,
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: 0,
      gallery: [],
      image: null,
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns null when its not a valid price", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            price: "nonsense",
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: null,
      gallery: [],
      image: null,
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("parses a root price to a number", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            price: "80.00",
            gallery: [],
            image: null,
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: 80,
      gallery: [],
      image: null,
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("parses a variation price to a number", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            variations: { nodes: [{ name: "Test", price: "80.00" }] },
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "My super awesome product",
      variations: [{ name: "Test", price: 80 }],
      price: 80,
      gallery: [],
      image: null,
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("also returns a root price when all the variations are the same", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            variations: {
              nodes: [
                { name: "Test", price: "80.00" },
                { name: "Test2", price: "80.00" },
              ],
            },
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "My super awesome product",
      variations: [
        { name: "Test", price: 80 },
        { name: "Test2", price: 80 },
      ],
      price: 80,
      gallery: [],
      image: null,
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns a min and max price when the variations are different", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            variations: {
              nodes: [
                { name: "Test", price: "10.00" },
                { name: "Test2", price: "80.00" },
              ],
            },
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "My super awesome product",
      variations: [
        { name: "Test", price: 10 },
        { name: "Test2", price: 80 },
      ],
      price: null,
      minPrice: 10,
      maxPrice: 80,
      gallery: [],
      image: null,
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns a min and max price when the variations are different and one is null", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            variations: {
              nodes: [
                { name: "Test", price: null },
                { name: "Test2", price: "80.00" },
              ],
            },
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "My super awesome product",
      variations: [
        { name: "Test", price: 0 },
        { name: "Test2", price: 80 },
      ],
      price: null,
      minPrice: 0,
      maxPrice: 80,
      gallery: [],
      image: null,
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns the featured image if it exists", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            variations: null,
            image: {
              altText: "my image alt",
              mediaDetails: {
                width: 199,
                height: 1003,
              },
              sourceUrl: "my source",
            },
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: null,
      image: {
        alt: "my image alt",
        width: 199,
        height: 1003,
        src: "my source",
      },
      gallery: [],
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns the an image gallery if it exists", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            variations: null,
            galleryImages: {
              nodes: [
                {
                  altText: "my first image alt",
                  mediaDetails: {
                    width: 199,
                    height: 1003,
                  },
                  sourceUrl: "my source",
                },
                {
                  altText: "my second image alt",
                  mediaDetails: {
                    width: 199,
                    height: 1003,
                  },
                  sourceUrl: "my source",
                },
              ],
            },
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: null,
      gallery: [
        {
          alt: "my first image alt",
          width: 199,
          height: 1003,
          src: "my source",
        },
        {
          alt: "my second image alt",
          width: 199,
          height: 1003,
          src: "my source",
        },
      ],
      image: null,
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("removes incomplete images from the gallery", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            variations: null,
            galleryImages: {
              nodes: [
                {
                  altText: "my first image alt",
                  mediaDetails: {
                    width: 199,
                    // Making this image incomplete on purpose
                    // height: 1003,
                  },
                  sourceUrl: "my source",
                },
                {
                  altText: "my second image alt",
                  mediaDetails: {
                    width: 199,
                    height: 1003,
                  },
                  sourceUrl: "my source",
                },
              ],
            },
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: null,
      gallery: [
        {
          alt: "my second image alt",
          width: 199,
          height: 1003,
          src: "my source",
        },
      ],
      image: null,
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});
