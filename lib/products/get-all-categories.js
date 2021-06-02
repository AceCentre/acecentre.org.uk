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
        products {
          nodes {
            slug
            moodleCourses {
              nodes {
                slug
              }
            }
          }
        }
        ancestors {
          nodes {
            id
          }
        }
        children {
          nodes {
            products {
              nodes {
                slug
                moodleCourses {
                  nodes {
                    slug
                  }
                }
              }
            }
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

  return topLevelCategories
    .map((topLevelCategory) => {
      // eslint-disable-next-line no-unused-vars
      const { ancestors, children, products, ...rest } = topLevelCategory;

      const productCount = getProductCount(products);

      if (productCount === 0) return null;

      return {
        ...rest,
        productCount,
        subcategories: children.nodes
          .map((child) => {
            const {
              // eslint-disable-next-line no-unused-vars
              ancestors,
              children,
              products: subProducts,
              ...restChild
            } = child;

            const subProductCount = getProductCount(subProducts);

            if (subProductCount === 0) return null;

            return {
              productCount: subProductCount,
              ...restChild,
              ...addFinalDeepChildren(children),
            };
          })
          .filter((node) => node !== null),
      };
    })
    .filter((node) => node !== null);
};

const getProductCount = (products) => {
  if (!products) return 0;
  if (!products.nodes) return 0;

  const nonMoodleCourses = products.nodes.filter((node) => {
    if (!node.moodleCourses) return true;
    if (!node.moodleCourses.nodes) return true;
    if (node.moodleCourses.nodes.length === 0) return true;

    return false;
  });

  return nonMoodleCourses.length;
};

const addFinalDeepChildren = (children) => {
  if (!children) return {};
  if (!children.nodes) return {};
  if (children.nodes.length === 0) return {};

  return { subcategories: children.nodes };
};
