import request, { gql } from "graphql-request";

const ENDPOINT = "https://acecentre.org.uk/graphql";

const NO_OF_PRODUCTS_TO_FETCH = 1000;

// Only use this query from staticProps calls
// because its a intensive query
const GetAllProductsQuery = gql`
  query AllProducts {
    products(first: ${NO_OF_PRODUCTS_TO_FETCH}) {
      nodes {
        slug
        name
        ... on VariableProduct {
            variations {
                nodes { 
                    name
                }
            }
        }
      }
    }
  }
`;

export const getAllProducts = async () => {
  const queryResponse = await request(ENDPOINT, GetAllProductsQuery);
  const productNodes = queryResponse.products.nodes;

  if (productNodes.length > NO_OF_PRODUCTS_TO_FETCH) {
    throw new Error(
      "There are more products than we requested. Increase the number of products to fetch"
    );
  }

  return productNodes.map(getProductFromNode);
};

const getProductFromNode = (node) => {
  return {
    slug: node.slug,
    name: node.name,
    variations: getVariationsFromNode(node),
  };
};

const getVariationsFromNode = (node) => {
  if (!node.variations) return null;
  if (!node.variations.nodes) return null;
  if (node.variations.nodes.length === 0) return null;
  if (!node.name) return null;

  const productName = node.name;

  const variations = node.variations.nodes.map((variation) => {
    const withoutParentName = variation.name.replace(`${productName} - `, "");
    return { name: withoutParentName };
  });

  return variations;
};
