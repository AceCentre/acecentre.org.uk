import nock from "nock";
import { getAllProducts } from "./get-products";
import config from "../config";

const EMPTY_RESPONSE = {
  data: {
    products: {
      nodes: [],
    },
  },
};

it("returns an empty array if there are no products", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [],
      },
    },
  };
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual([]);
});

it("throws an error if there are more products than we query for", async () => {
  // Arrange
  let nodes = [];
  for (let i = 0; i < 200; i++) {
    nodes.push({
      slug: `node-${i}`,
      databaseId: i,
      date: "date",
    });
  }
  const mockResponse = {
    data: {
      products: {
        nodes,
      },
    },
  };
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);

  // Act and Assert
  await expect(getAllProducts()).rejects.toThrow(
    "Not getting enough products!"
  );
});

it("gets all the slugs and names for each product", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            description: null,
            slug: "my-product",
            name: "My super awesome product",
            price: null,
            databaseId: 1,
            date: "date",
          },
        ],
      },
    },
  };
  const expected = [
    {
      id: 1,
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: 0,
      gallery: [],
      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      totalSales: 0,
      featured: false,
      description: null,
      isLaunchpadTemplate: false,
      faqs: [],
      date: "date",
      projects: [],
      inStock: true,
      shortDescription: null,
      ebook: null,
      category: {
        name: "Product",
      },
      attachedResources: [],
      catalogVisibility: null,
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

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
            databaseId: 1,
            slug: "my-product",
            name: "ABC with core words",
            date: "date",

            variations: {
              nodes: [
                {
                  slug: "one",
                  databaseId: 2,
                  name: "ABC with core words - Word",
                  price: null,
                },
                {
                  slug: "two",
                  databaseId: 3,
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
      totalSales: 0,
      slug: "my-product",
      name: "ABC with core words",
      price: 0,
      id: 1,
      date: "date",
      inStock: true,
      shortDescription: null,
      ebook: null,
      isLaunchpadTemplate: false,
      faqs: [],

      variations: [
        {
          id: 2,
          slug: "one",
          name: "Word",
          price: 0,
          instantDownloadAvailable: false,
          outOfStockForm: null,
          popupFormBehaviour: null,
          inStock: true,
        },
        {
          id: 3,
          slug: "two",
          name: "PDF",
          price: 0,
          instantDownloadAvailable: false,
          outOfStockForm: null,
          popupFormBehaviour: null,
          inStock: true,
        },
      ],
      gallery: [],
      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      featured: false,
      description: null,
      projects: [],

      category: {
        name: "Product",
      },
      attachedResources: [],
      catalogVisibility: null,
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

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
            date: "date",

            databaseId: 1,
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
      id: 1,
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: 0,
      gallery: [],
      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      totalSales: 0,
      featured: false,
      description: null,
      date: "date",
      projects: [],
      inStock: true,
      shortDescription: null,
      ebook: null,
      isLaunchpadTemplate: false,
      faqs: [],

      category: {
        name: "Product",
      },
      attachedResources: [],
      catalogVisibility: null,
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

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
            date: "date",

            databaseId: 1,
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
      id: 1,
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: null,
      gallery: [],
      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      totalSales: 0,
      featured: false,
      description: null,
      date: "date",
      projects: [],
      inStock: true,
      shortDescription: null,
      ebook: null,
      isLaunchpadTemplate: false,
      faqs: [],

      category: {
        name: "Product",
      },
      attachedResources: [],
      catalogVisibility: null,
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

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
            databaseId: 1,
            slug: "my-product",
            name: "My super awesome product",
            price: "80.00",
            gallery: [],
            image: null,
            date: "date",
          },
        ],
      },
    },
  };
  const expected = [
    {
      id: 1,
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: 80,
      gallery: [],
      image: null,
      totalSales: 0,

      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      featured: false,
      description: null,
      date: "date",
      isLaunchpadTemplate: false,
      faqs: [],

      projects: [],
      inStock: true,
      shortDescription: null,
      ebook: null,
      attachedResources: [],
      catalogVisibility: null,

      category: {
        name: "Product",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

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
            databaseId: 1,
            slug: "my-product",
            name: "My super awesome product",
            date: "date",

            variations: {
              nodes: [
                { slug: "one", databaseId: 2, name: "Test", price: "80.00" },
              ],
            },
          },
        ],
      },
    },
  };
  const expected = [
    {
      id: 1,
      slug: "my-product",
      name: "My super awesome product",
      variations: [
        {
          id: 2,
          name: "Test",
          price: 80,
          instantDownloadAvailable: false,
          outOfStockForm: null,
          popupFormBehaviour: null,
          slug: "one",
          inStock: true,
        },
      ],
      inStock: true,
      shortDescription: null,
      price: 80,
      gallery: [],
      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      totalSales: 0,
      isLaunchpadTemplate: false,
      faqs: [],

      featured: false,
      description: null,
      projects: [],
      ebook: null,

      date: "date",
      category: {
        name: "Product",
      },
      attachedResources: [],
      catalogVisibility: null,
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

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
            databaseId: 1,
            slug: "my-product",
            name: "My super awesome product",
            date: "date",

            variations: {
              nodes: [
                { databaseId: 2, name: "Test", price: "80.00", slug: "one" },
                { databaseId: 3, name: "Test2", price: "80.00", slug: "two" },
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
      id: 1,
      isLaunchpadTemplate: false,
      faqs: [],

      variations: [
        {
          id: 2,
          name: "Test",
          slug: "one",
          price: 80,
          instantDownloadAvailable: false,
          outOfStockForm: null,
          popupFormBehaviour: null,
          inStock: true,
        },
        {
          id: 3,
          name: "Test2",
          slug: "two",
          price: 80,
          instantDownloadAvailable: false,
          outOfStockForm: null,
          popupFormBehaviour: null,
          inStock: true,
        },
      ],
      price: 80,
      gallery: [],
      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      totalSales: 0,
      featured: false,
      description: null,
      projects: [],
      inStock: true,
      shortDescription: null,
      date: "date",
      ebook: null,

      category: {
        name: "Product",
      },
      attachedResources: [],
      catalogVisibility: null,
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

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
            databaseId: 1,
            name: "My super awesome product",
            date: "date",

            variations: {
              nodes: [
                { databaseId: 2, name: "Test", price: "10.00", slug: "one" },
                { databaseId: 3, name: "Test2", price: "80.00", slug: "two" },
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
      id: 1,
      name: "My super awesome product",
      isLaunchpadTemplate: false,
      faqs: [],

      variations: [
        {
          id: 2,
          name: "Test",
          price: 10,
          instantDownloadAvailable: false,
          outOfStockForm: null,
          popupFormBehaviour: null,
          slug: "one",
          inStock: true,
        },
        {
          id: 3,
          name: "Test2",
          price: 80,
          instantDownloadAvailable: false,
          outOfStockForm: null,
          popupFormBehaviour: null,
          slug: "two",
          inStock: true,
        },
      ],
      price: null,
      minPrice: 10,
      maxPrice: 80,
      gallery: [],
      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      totalSales: 0,
      date: "date",
      ebook: null,
      attachedResources: [],
      catalogVisibility: null,

      featured: false,
      description: null,
      projects: [],
      inStock: true,
      shortDescription: null,
      category: {
        name: "Product",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

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
            databaseId: 1,
            slug: "my-product",
            name: "My super awesome product",
            date: "date",

            variations: {
              nodes: [
                { databaseId: 2, name: "Test", price: null, slug: "one" },
                { databaseId: 3, name: "Test2", price: "80.00", slug: "two" },
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
      id: 1,
      isLaunchpadTemplate: false,
      faqs: [],

      variations: [
        {
          id: 2,
          name: "Test",
          price: 0,
          instantDownloadAvailable: false,
          outOfStockForm: null,
          popupFormBehaviour: null,
          slug: "one",
          inStock: true,
        },
        {
          id: 3,
          name: "Test2",
          price: 80,
          instantDownloadAvailable: false,
          outOfStockForm: null,
          popupFormBehaviour: null,
          slug: "two",
          inStock: true,
        },
      ],
      price: null,
      minPrice: 0,
      maxPrice: 80,
      gallery: [],
      image: null,
      date: "date",

      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      totalSales: 0,
      featured: false,
      description: null,
      projects: [],
      inStock: true,
      shortDescription: null,
      ebook: null,
      attachedResources: [],
      catalogVisibility: null,

      category: {
        name: "Product",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

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
            databaseId: 1,
            slug: "my-product",
            name: "My super awesome product",
            variations: null,
            date: "date",

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
      isLaunchpadTemplate: false,
      faqs: [],

      id: 1,
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
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      totalSales: 0,
      date: "date",

      featured: false,
      projects: [],
      inStock: true,
      shortDescription: null,
      description: null,
      ebook: null,
      attachedResources: [],
      catalogVisibility: null,

      category: {
        name: "Product",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

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
            databaseId: 1,
            slug: "my-product",
            name: "My super awesome product",
            variations: null,
            date: "date",

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
      id: 1,
      isLaunchpadTemplate: false,
      faqs: [],

      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      date: "date",

      price: null,
      projects: [],

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
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      totalSales: 0,
      featured: false,
      description: null,
      inStock: true,
      shortDescription: null,
      ebook: null,
      attachedResources: [],
      catalogVisibility: null,

      category: {
        name: "Product",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

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
            databaseId: 1,
            slug: "my-product",
            name: "My super awesome product",
            variations: null,
            date: "date",

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
      id: 1,
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: null,
      date: "date",
      isLaunchpadTemplate: false,
      faqs: [],

      gallery: [
        {
          alt: "my second image alt",
          width: 199,
          height: 1003,
          src: "my source",
        },
      ],
      attachedResources: [],
      catalogVisibility: null,

      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      totalSales: 0,
      featured: false,
      description: null,
      projects: [],
      inStock: true,
      shortDescription: null,
      ebook: null,

      category: {
        name: "Product",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("if the root product is free and its downloadable offer a download url", async () => {
  // Arrange
  const databaseId = 27406;
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            variations: null,
            date: "date",

            price: null,
            downloadable: true,
            stockStatus: "IN_STOCK",
            stockQuantity: null,
            databaseId,
          },
        ],
      },
    },
  };
  const expected = [
    {
      id: databaseId,
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      isLaunchpadTemplate: false,
      faqs: [],

      price: 0,
      gallery: [],
      image: null,
      instantDownloadAvailable: true,
      outOfStockForm: null,
      popupFormBehaviour: null,
      downloadUrl: `/?download_file=${databaseId}&free=1`,
      totalSales: 0,
      featured: false,
      description: null,
      date: "date",
      projects: [],
      inStock: true,
      shortDescription: null,
      ebook: null,
      attachedResources: [],
      catalogVisibility: null,

      category: {
        name: "Product",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("Uses the root category", async () => {
  // Arrange
  const databaseId = 27406;
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            productCategories: {
              nodes: [{ name: "test" }],
            },
            variations: null,
            date: "date",
            price: null,
            downloadable: true,
            stockStatus: "IN_STOCK",
            stockQuantity: null,
            databaseId,
          },
        ],
      },
    },
  };
  const expected = [
    {
      id: databaseId,
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: 0,
      gallery: [],
      image: null,
      instantDownloadAvailable: true,
      outOfStockForm: null,
      popupFormBehaviour: null,
      downloadUrl: `/?download_file=${databaseId}&free=1`,
      totalSales: 0,
      featured: false,
      description: null,
      date: "date",
      projects: [],
      isLaunchpadTemplate: false,
      faqs: [],

      inStock: true,
      shortDescription: null,
      ebook: null,
      attachedResources: [],
      catalogVisibility: null,

      category: {
        name: "test",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("Uses the parent category", async () => {
  // Arrange
  const databaseId = 27406;
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            productCategories: {
              nodes: [{ name: "root", parent: { node: { name: "parent" } } }],
            },
            variations: null,
            date: "date",
            price: null,
            downloadable: true,
            stockStatus: "IN_STOCK",
            stockQuantity: null,
            databaseId,
          },
        ],
      },
    },
  };
  const expected = [
    {
      id: databaseId,
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: 0,
      gallery: [],
      image: null,
      instantDownloadAvailable: true,
      outOfStockForm: null,
      popupFormBehaviour: null,
      downloadUrl: `/?download_file=${databaseId}&free=1`,
      totalSales: 0,
      featured: false,
      description: null,
      date: "date",
      projects: [],
      inStock: true,
      shortDescription: null,
      isLaunchpadTemplate: false,
      faqs: [],

      ebook: null,
      attachedResources: [],
      catalogVisibility: null,

      category: {
        name: "parent",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("Uses the parent parent category", async () => {
  // Arrange
  const databaseId = 27406;
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            productCategories: {
              nodes: [
                {
                  name: "root",
                  parent: {
                    node: {
                      name: "parent",
                      parent: { node: { name: "parent-parent" } },
                    },
                  },
                },
              ],
            },
            variations: null,
            date: "date",
            price: null,
            downloadable: true,
            stockStatus: "IN_STOCK",
            stockQuantity: null,
            databaseId,
          },
        ],
      },
    },
  };
  const expected = [
    {
      id: databaseId,
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: 0,
      gallery: [],
      image: null,
      instantDownloadAvailable: true,
      outOfStockForm: null,
      popupFormBehaviour: null,
      downloadUrl: `/?download_file=${databaseId}&free=1`,
      totalSales: 0,
      featured: false,
      description: null,
      date: "date",
      projects: [],
      isLaunchpadTemplate: false,
      faqs: [],

      inStock: true,
      shortDescription: null,
      ebook: null,
      attachedResources: [],
      catalogVisibility: null,

      category: {
        name: "parent-parent",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("if the root product costs and its downloadable its not instantly downloadable", async () => {
  // Arrange
  const databaseId = 27406;
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            slug: "my-product",
            name: "My super awesome product",
            variations: null,
            date: "date",

            price: "80.00",
            downloadable: true,
            stockStatus: "IN_STOCK",
            stockQuantity: null,
            databaseId,
          },
        ],
      },
    },
  };
  const expected = [
    {
      id: databaseId,
      slug: "my-product",
      name: "My super awesome product",
      variations: null,
      price: 80,
      gallery: [],
      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      totalSales: 0,
      featured: false,
      isLaunchpadTemplate: false,
      faqs: [],

      description: null,
      date: "date",
      projects: [],
      inStock: true,
      shortDescription: null,
      ebook: null,
      attachedResources: [],
      catalogVisibility: null,

      category: {
        name: "Product",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("a variation can be instalantly downloadable", async () => {
  // Arrange
  const databaseId = 27406;
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            databaseId: 1,
            slug: "my-product",
            name: "My super awesome product",
            date: "date",

            variations: {
              nodes: [
                {
                  name: "My super awesome product - variation",
                  price: null,
                  downloadable: true,
                  stockStatus: "IN_STOCK",
                  stockQuantity: null,
                  databaseId,
                  slug: "one",
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
      id: 1,
      slug: "my-product",
      name: "My super awesome product",
      variations: [
        {
          id: databaseId,
          downloadUrl: "/?download_file=27406&free=1",
          instantDownloadAvailable: true,
          outOfStockForm: null,
          popupFormBehaviour: null,
          name: "variation",
          price: 0,
          slug: "one",
          inStock: true,
        },
      ],
      price: 0,
      gallery: [],
      date: "date",

      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      isLaunchpadTemplate: false,
      faqs: [],

      totalSales: 0,
      featured: false,
      description: null,
      projects: [],
      inStock: true,
      shortDescription: null,
      ebook: null,
      attachedResources: [],
      catalogVisibility: null,

      category: {
        name: "Product",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("passes the total sales of a single product", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            databaseId: 1,
            slug: "my-product",
            name: "My super awesome product",
            price: null,
            date: "date",

            totalSales: 100,
          },
        ],
      },
    },
  };
  const expected = [
    {
      id: 1,
      slug: "my-product",
      name: "My super awesome product",
      price: 0,
      gallery: [],
      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      variations: null,
      totalSales: 100,
      featured: false,
      description: null,
      date: "date",
      projects: [],
      inStock: true,
      shortDescription: null,
      ebook: null,
      isLaunchpadTemplate: false,
      faqs: [],

      attachedResources: [],
      catalogVisibility: null,

      category: {
        name: "Product",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("adds up the total sales of the variants and uses that if its more", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            databaseId: 1,
            slug: "my-product",
            name: "My super awesome product",
            price: null,
            totalSales: 0,
            date: "date",

            variations: {
              nodes: [
                {
                  name: "My super awesome product - variation",
                  price: null,
                  downloadable: true,
                  stockStatus: "IN_STOCK",
                  stockQuantity: null,
                  databaseId: 2,
                  totalSales: 1,
                  slug: "one",
                },
                {
                  name: "My super awesome product - variation",
                  price: null,
                  downloadable: true,
                  stockStatus: "IN_STOCK",
                  stockQuantity: null,
                  databaseId: 3,
                  totalSales: 1,
                  slug: "two",
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
      id: 1,
      slug: "my-product",
      name: "My super awesome product",
      price: 0,
      gallery: [],
      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      date: "date",

      variations: [
        {
          downloadUrl: "/?download_file=2&free=1",
          id: 2,
          instantDownloadAvailable: true,
          outOfStockForm: null,
          popupFormBehaviour: null,
          name: "variation",
          price: 0,
          slug: "one",
          inStock: true,
        },
        {
          downloadUrl: "/?download_file=3&free=1",
          id: 3,
          instantDownloadAvailable: true,
          outOfStockForm: null,
          popupFormBehaviour: null,
          name: "variation",
          price: 0,
          slug: "two",
          inStock: true,
        },
      ],
      totalSales: 2,
      featured: false,
      description: null,
      isLaunchpadTemplate: false,
      faqs: [],

      projects: [],
      inStock: true,
      shortDescription: null,
      ebook: null,
      attachedResources: [],
      catalogVisibility: null,

      category: {
        name: "Product",
      },
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("uses the total sales of the root product if its more", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            databaseId: 1,
            slug: "my-product",
            name: "My super awesome product",
            price: null,
            totalSales: 3,
            date: "date",

            variations: {
              nodes: [
                {
                  name: "My super awesome product - variation",
                  price: null,
                  downloadable: true,
                  stockStatus: "IN_STOCK",
                  stockQuantity: null,
                  databaseId: 2,
                  totalSales: 1,
                  slug: "one",
                },
                {
                  name: "My super awesome product - variation",
                  price: null,
                  downloadable: true,
                  stockStatus: "IN_STOCK",
                  stockQuantity: null,
                  databaseId: 3,
                  totalSales: 1,
                  slug: "two",
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
      id: 1,
      slug: "my-product",
      name: "My super awesome product",
      price: 0,
      gallery: [],
      isLaunchpadTemplate: false,
      faqs: [],

      image: null,
      instantDownloadAvailable: false,
      outOfStockForm: null,
      popupFormBehaviour: null,
      category: {
        name: "Product",
      },
      variations: [
        {
          downloadUrl: "/?download_file=2&free=1",
          id: 2,
          instantDownloadAvailable: true,
          outOfStockForm: null,
          popupFormBehaviour: null,
          name: "variation",
          price: 0,
          slug: "one",
          inStock: true,
        },
        {
          downloadUrl: "/?download_file=3&free=1",
          id: 3,
          instantDownloadAvailable: true,
          outOfStockForm: null,
          popupFormBehaviour: null,
          name: "variation",
          price: 0,
          slug: "two",
          inStock: true,
        },
      ],
      totalSales: 3,
      featured: false,
      description: null,
      projects: [],
      date: "date",
      inStock: true,
      shortDescription: null,
      ebook: null,
      attachedResources: [],
      catalogVisibility: null,
    },
  ];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("removes a product if it has a moodle course", async () => {
  // Arrange
  const mockResponse = {
    data: {
      products: {
        nodes: [
          {
            databaseId: 1,
            slug: "my-product",
            name: "My super awesome product",
            price: null,
            totalSales: 3,
            moodleCourses: {
              nodes: [
                {
                  id: 1,
                },
              ],
            },
          },
        ],
      },
    },
  };
  const expected = [];
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  nock(config.launchpadUrl)
    .post("/")
    .reply(200, { data: { templates: [] } });
  nock(config.baseUrl).post("/graphql").reply(200, EMPTY_RESPONSE);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});
