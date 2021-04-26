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
