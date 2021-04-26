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
          },
        ],
      },
    },
  };
  const expected = [
    {
      slug: "my-product",
      name: "my super awesome product",
    },
  ];
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllProducts();

  // Assert
  expect(result).toStrictEqual(expected);
});
