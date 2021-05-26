import request, { gql } from "graphql-request";
import config from "../config";

const ENDPOINT = `${config.baseUrl}/graphql`;

const GetAllProductCategories = gql`
  query GetAllProductCategories {
    productCategories(first: 1000) {
      nodes {
        name
        id
        slug
        ancestors {
          nodes {
            id
          }
        }
        children {
          nodes {
            name
            id
            slug
            children {
              nodes {
                id
                slug
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const getAllProductCategories = async () => {
  const queryResponse = await request(ENDPOINT, GetAllProductCategories);
  const categories = queryResponse.productCategories.nodes;

  return parseCategories(categories);
};

// Only exported for testing
export const parseCategories = (catetoryNodes) => {
  const topLevelCategories = catetoryNodes.filter(
    (node) => node.ancestors == null
  );

  return topLevelCategories.map((topLevelCategory) => {
    // eslint-disable-next-line no-unused-vars
    const { ancestors, children, ...rest } = topLevelCategory;

    return {
      ...rest,
      subcategories: children.nodes.map((child) => {
        // eslint-disable-next-line no-unused-vars
        const { children, ancestors, ...restChild } = child;

        return { ...restChild, ...addFinalDeepChildren(children) };
      }),
    };
  });
};

const addFinalDeepChildren = (children) => {
  if (!children) return {};
  if (!children.nodes) return {};
  if (children.nodes.length === 0) return {};

  return { subcategories: children.nodes };
};
