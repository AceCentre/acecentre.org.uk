import { gql } from "graphql-request";
import { request } from "../data-fetching";

import config from "../config";
import { getMediaNode } from "../utils/get-media-node";

const ENDPOINT = `${config.stellateUrl}`;

export const GetAllProductCategories = gql`
  query GetAllProductCategories {
    productCategories(first: 1000) {
      nodes {
        name
        id
        slug
        products(first: 1000) {
          nodes {
            slug
            moodleCourses {
              nodes {
                slug
              }
            }
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
  const queryResponse = await request(ENDPOINT, GetAllProductCategories);
  const categories = queryResponse.productCategories.nodes;

  return parseCategories(categories);
};

export const getAllCourseCategories = async () => {
  const queryResponse = await request(ENDPOINT, GetAllProductCategories);
  const categories = queryResponse.productCategories.nodes;
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

  return topLevelCategories
    .map((topLevelCategory) => {
      const {
        // eslint-disable-next-line no-unused-vars
        ancestors,
        children,
        products,
        image,
        ...rest
      } = topLevelCategory;

      const { productCount, nonMoodleProducts } = getMeta(products);

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
            } = getMeta(subProducts);

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
    .filter((node) => node.slug !== "uncategorised");
};

const getProductsMeta = (products) => {
  if (!products) return 0;
  if (!products.nodes) return 0;

  const nonMoodleCourses = products.nodes.filter((node) => {
    if (!node.moodleCourses) return true;
    if (!node.moodleCourses.nodes) return true;
    if (node.moodleCourses.nodes.length === 0) return true;

    return false;
  });

  return {
    nonMoodleProducts: nonMoodleCourses.map((x) => x.slug),
    productCount: nonMoodleCourses.length,
  };
};

const getCourseMeta = (products) => {
  if (!products) return 0;
  if (!products.nodes) return 0;

  const nonMoodleCourses = products.nodes.filter((node) => {
    if (!node.moodleCourses) return false;
    if (!node.moodleCourses.nodes) return false;
    if (node.moodleCourses.nodes.length === 0) return false;

    return true;
  });

  return {
    nonMoodleProducts: nonMoodleCourses.map((x) => x.slug),
    productCount: nonMoodleCourses.length,
  };
};

const addFinalDeepChildren = (children) => {
  if (!children) return {};
  if (!children.nodes) return {};
  if (children.nodes.length === 0) return {};

  return { subcategories: children.nodes };
};
