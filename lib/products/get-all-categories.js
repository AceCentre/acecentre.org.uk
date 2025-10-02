import { gql } from "graphql-request";
import { request } from "../data-fetching";

import config from "../config";
import { getMediaNode } from "../utils/get-media-node";

const ENDPOINT = `${config.baseUrl}/graphql`;

// Gracefully handle partial data when server-side resolvers throw errors
// by returning error.response.data if available.
const safeRequest = async (endpoint, query, variables) => {
  try {
    return await request(endpoint, query, variables);
  } catch (error) {
    const data = error?.response?.data;
    if (data) return data;
    throw error;
  }
};

export const GetAllProductCategories = gql`
  query GetAllProductCategories {
    productCategories(first: 1000) {
      nodes {
        name
        description
        id
        slug
        products(first: 1000) {
          nodes {
            slug
          }
        }
        image {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        ancestors {
          nodes {
            id
          }
        }
        children(first: 1000) {
          nodes {
            products(first: 1000) {
              nodes {
                slug
              }
            }
            name
            id
            slug
            image {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
            children(first: 1000) {
              nodes {
                id
                slug
                name
                image {
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getAllProductCategories = async () => {
  const queryResponse = await safeRequest(ENDPOINT, GetAllProductCategories);
  const categories = queryResponse.productCategories?.nodes || [];

  const wooProductCategories = parseCategories(categories);

  return { slugs: wooProductCategories, fullCategories: categories };
};

export const getAllCourseCategories = async () => {
  const queryResponse = await safeRequest(ENDPOINT, GetAllProductCategories);
  const categories = queryResponse.productCategories?.nodes || [];
  const parsed = parseCategories(categories, getCourseMeta);

  const learningCategory = parsed.find(
    (category) => category.slug === "learning"
  );

  if (!learningCategory) return null;

  return learningCategory.subcategories;
};

// Only exported for testing
export const parseCategories = (catetoryNodes, getMeta = getProductsMeta) => {
  const topLevelCategories = catetoryNodes.filter(
    (node) => node.ancestors == null
  );

  return (
    topLevelCategories
      .map((topLevelCategory) => {
        const {
          // eslint-disable-next-line no-unused-vars
          ancestors,
          children,
          products,
          image,
          ...rest
        } = topLevelCategory;

        const productsOfChildren = children.nodes.flatMap(
          (x) => x.products.nodes
        );
        const allProducts = [...products.nodes, ...productsOfChildren];

        const uniqueProducts = [
          ...new Map(allProducts.map((item) => [item["slug"], item])).values(),
        ];

        const { productCount, nonMoodleProducts } = getMeta(
          { nodes: uniqueProducts },
          topLevelCategory
        );

        if (productCount === 0) return null;

        return {
          ...rest,
          image: getMediaNode(image),
          productCount,
          productSlugs: nonMoodleProducts,
          subcategories: children.nodes
            .map((child) => {
              const {
                // eslint-disable-next-line no-unused-vars
                ancestors,
                children,
                products: subProducts,
                image,
                ...restChild
              } = child;

              const {
                productCount: subProductCount,
                nonMoodleProducts: subNonMoodleProducts,
              } = getMeta(subProducts, topLevelCategory);

              if (subProductCount === 0) return null;

              return {
                image: getMediaNode(image),
                productSlugs: subNonMoodleProducts,
                productCount: subProductCount,
                ...restChild,
                ...addFinalDeepChildren(children),
              };
            })
            .filter((node) => node !== null),
        };
      })
      .filter((node) => node !== null)
      .filter((node) => node.slug !== "uncategorised")
      // Hide Learning from the public category filter
      .filter((node) => node.slug !== "learning")
  );
};

const getProductsMeta = (products) => {
  if (!products) return { nonMoodleProducts: [], productCount: 0 };
  if (!products.nodes) return { nonMoodleProducts: [], productCount: 0 };

  // Edwiser Bridge is deactivated; treat all products as regular products
  const allProducts = products.nodes;

  return {
    nonMoodleProducts: allProducts.map((x) => x.slug),
    productCount: allProducts.length,
  };
};

const getCourseMeta = () => {
  // With Edwiser deactivated there are no Moodle course products available.
  // Return empty to avoid surfacing course-only categories in course views.
  return { nonMoodleProducts: [], productCount: 0 };
};

const addFinalDeepChildren = (children) => {
  if (!children) return {};
  if (!children.nodes) return {};
  if (children.nodes.length === 0) return {};

  return { subcategories: children.nodes };
};
