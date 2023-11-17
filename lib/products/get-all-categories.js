import { gql } from "graphql-request";
import { request } from "../data-fetching";

import config from "../config";
import { getMediaNode } from "../utils/get-media-node";
import { getLaunchpadCategories } from "../launchpad";

const ENDPOINT = `${config.baseUrl}/graphql`;

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

  const wooProductCategories = parseCategories(categories);

  const launchpadItems = await getLaunchpadCategories();

  for (const currentItem of launchpadItems) {
    const mainCategory = wooProductCategories.find(
      (x) => x.slug === currentItem.templateCategorySlug
    );

    mainCategory.productCount = mainCategory.productCount + 1;
    mainCategory.productSlugs = [
      currentItem.templateId,
      ...mainCategory.productSlugs,
    ];

    if (!mainCategory) continue;

    const subcategory = mainCategory.subcategories.find(
      (x) => x.slug === currentItem.templateSubcategorySlug
    );

    if (!subcategory) {
      mainCategory.subcategories.push({
        productSlugs: [currentItem.templateId],
        name: currentItem.templateSubcategory,
        slug: currentItem.templateSubcategorySlug,
        productCount: 1,
      });
    } else {
      subcategory.productCount = subcategory.productCount + 1;
      subcategory.productSlugs = [
        currentItem.templateId,
        ...subcategory.productSlugs,
      ];
    }
  }

  return wooProductCategories;
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

      const { productCount, nonMoodleProducts } = getMeta(
        products,
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
    .filter((node) => node.slug !== "uncategorised");
};

const getProductsMeta = (products, topLevel) => {
  const allChildrenProducts = topLevel.children.nodes.flatMap(
    (x) => x.products.nodes
  );
  const allProducts = [...products.nodes, ...allChildrenProducts];

  const nonMoodleCourses = allProducts.filter((node) => {
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

const getCourseMeta = (products, topLevel) => {
  const allChildrenProducts = topLevel.children.nodes.flatMap(
    (x) => x.products.nodes
  );
  const allProducts = [...products.nodes, ...allChildrenProducts];

  const nonMoodleCourses = allProducts.filter((node) => {
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
