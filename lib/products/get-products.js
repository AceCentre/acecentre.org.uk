import { gql } from "graphql-request";

import { request } from "../data-fetching";

import { getMediaNode } from "../utils/get-media-node";
import config from "../config";
import { getFeaturedImage, getMainCategoryName } from "../posts/get-posts";

const ENDPOINT = `${config.baseUrl}/graphql`;

const NO_OF_PRODUCTS_TO_FETCH = 150;

// Only use this query from staticProps calls
// because its a intensive query
export const GetAllProductsQuery = gql`
  query AllProducts {
    products(first: 1000) {
      nodes {
        __typename
        attachedResources {
          nodes {
            slug
            databaseId
            date
            name
            description
            shortDescription
            featured
            totalSales
            meta {
              ibook
              epubLocation
              epubViewLocation
            }
            image {
              altText
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
            productCategories {
              nodes {
                name
                slug
                parent {
                  node {
                    name
                    parent {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
        productCategories {
          nodes {
            name
            slug
            parent {
              node {
                name
                parent {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
        meta {
          ibook
          epubLocation
          epubViewLocation
          project {
            ... on Project {
              title
              slug
              content
              date
              excerpt
              categories {
                nodes {
                  name
                }
              }
              extraMeta {
                featured
              }
              featuredImage {
                node {
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
        slug
        name
        totalSales
        featured
        shortDescription
        description
        date
        courseGroupPurchase

        moodleCourses {
          nodes {
            id
            content
            title
            featuredImage {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            meta {
              location
              date
              dateSpecific
              shortDesc
              courseLevel {
                name
                slug
                id
              }
            }
          }
        }

        image {
          altText
          mediaDetails {
            width
            height
          }
          sourceUrl
        }

        galleryImages {
          nodes {
            altText
            mediaDetails {
              width
              height
            }
            sourceUrl
          }
        }

        ... on SimpleProduct {
          price(format: RAW)
          soldIndividually
          downloadable
          stockStatus
          stockQuantity
          databaseId
        }

        ... on ExternalProduct {
          price(format: RAW)
          databaseId
          externalUrl
          buttonText
        }
        ... on BundleProduct {
          bundled {
            nodes {
              productCategories {
                nodes {
                  name
                  slug
                  parent {
                    node {
                      name
                      parent {
                        node {
                          name
                        }
                      }
                    }
                  }
                }
              }
              slug
              name
              totalSales
              featured
              shortDescription
              description
              date
              courseGroupPurchase
              moodleCourses {
                nodes {
                  id
                  content
                  title
                  featuredImage {
                    node {
                      sourceUrl
                      altText
                      mediaDetails {
                        width
                        height
                      }
                    }
                  }
                  meta {
                    location
                    date
                    dateSpecific
                    shortDesc
                    courseLevel {
                      name
                      slug
                      id
                    }
                  }
                }
              }
              image {
                altText
                mediaDetails {
                  width
                  height
                }
                sourceUrl
              }
              galleryImages {
                nodes {
                  altText
                  mediaDetails {
                    width
                    height
                  }
                  sourceUrl
                }
              }
            }
          }
        }
        ... on VariableProduct {
          databaseId
          soldIndividually
          variations(first: 1000) {
            nodes {
              name
              id
              slug
              price(format: RAW)
              totalSales
              downloadable
              stockStatus
              stockQuantity
              databaseId
              attributes {
                nodes {
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const isMoodleProduct = (product) => {
  if (!product) return false;
  if (!product.moodleCourses) return false;
  if (!product.moodleCourses.nodes) return false;
  if (product.moodleCourses.nodes.length == 0) return false;

  return true;
};

const FILTER_LIST = ["developing-using-communication-book-templates"];

export const getAllProducts = async (allowAll = false) => {
  const queryResponse = await request(ENDPOINT, GetAllProductsQuery);
  const productNodes = queryResponse.products.nodes.filter((product) => {
    if (isMoodleProduct(product)) return false;

    if (product.__typename == "BundleProduct") return false;

    return true;
  });

  // This doesnt make any sense
  if (productNodes.length > NO_OF_PRODUCTS_TO_FETCH) {
    throw new Error(
      "There are more products than we requested. Increase the number of products to fetch"
    );
  }

  return productNodes
    .map(getProductFromNode)
    .filter((current) => allowAll || !FILTER_LIST.includes(current.slug));
};

export const getAllProductsByPopularity = async () => {
  const allProducts = await getAllProducts();

  return allProducts.sort((a, b) => b.totalSales - a.totalSales);
};

export const getProductFromNode = (node) => {
  const variations = getVariationsFromNode(node);

  const attachedResources = node.attachedResources || { nodes: [] };
  const attachedNodes = attachedResources.nodes;

  return {
    id: node.databaseId,
    date: node.date,
    slug: node.slug,
    name: node.name,
    description: node.description || null,
    shortDescription: node.shortDescription || null,
    attachedResources: attachedNodes.map(getProductFromNode),
    featured: node.featured || false,
    totalSales: getTotalSalesFromNode(node),
    price: getPriceFromNode(node),
    variations: getVariationsFromNode(node),
    image: getImageFromNode(node),
    gallery: getGalleryFromNode(node),
    inStock: isInStock(node),

    category: getCategoryFromNode(node),

    projects: getProjectFromNode(node),

    ebook: getEbookFromNode(node),

    ...getDownloadProperties(node),

    // We want to override some root properties
    // like price, minPrice and maxPrice depending on the variations
    ...getVariationOverrides(variations),

    ...getExternalOptions(node),
  };
};

const getEbookFromNode = (node) => {
  if (!node) return null;
  if (!node.meta) return null;
  if (!node.meta.epubViewLocation) return null;
  if (!node.meta.epubLocation) return null;

  return {
    ibook: node.meta.ibook || null,
    downloadLocation: node.meta.epubLocation,
    viewLocation: node.meta.epubViewLocation,
  };
};

const getExternalOptions = (node) => {
  if (!node) return {};

  if (node.externalUrl && node.buttonText) {
    return {
      external: { url: node.externalUrl, cta: node.buttonText },
    };
  }

  if (node.externalUrl) {
    return {
      external: { url: node.externalUrl, cta: "Go to website" },
    };
  }

  return {};
};

export const isInStock = (node) => {
  if (!node.stockStatus) return true;

  return node.stockStatus === "IN_STOCK";
};

const getProjectFromNode = (node) => {
  if (!node) return [];
  if (!node.meta) return [];
  if (!node.meta.project) return [];

  return node.meta.project.map((project) => ({
    slug: project.slug,
    title: project.title,
    content: project.content,
    mainCategoryName: getMainCategoryName(project),
    featuredImage: getFeaturedImage(project),
    description: project.excerpt,
    publishedDate: new Date(project.date).toString(),
  }));
};

export const getCategoryFromNode = (node, defaultCategoryName = "Product") => {
  const defaultCategory = {
    name: defaultCategoryName,
  };

  if (!node) return defaultCategory;
  if (!node.productCategories) return defaultCategory;
  if (!node.productCategories.nodes) return defaultCategory;
  if (node.productCategories.nodes.length === 0) return defaultCategory;

  let mainCategory = node.productCategories.nodes[0];

  if (node.productCategories.nodes.length > 1) {
    const categoriesWithoutGettingStarted = node.productCategories.nodes.filter(
      (x) => x.slug !== "getting-started"
    );

    mainCategory = categoriesWithoutGettingStarted[0];
  }

  if (
    mainCategory.parent &&
    mainCategory.parent.node &&
    mainCategory.parent.node.parent &&
    mainCategory.parent.node.parent.node &&
    mainCategory.parent.node.parent.node.name
  ) {
    return { name: mainCategory.parent.node.parent.node.name };
  }

  if (
    mainCategory.parent &&
    mainCategory.parent.node &&
    mainCategory.parent.node.name
  ) {
    return { name: mainCategory.parent.node.name };
  }

  if (mainCategory.name) {
    return { name: mainCategory.name };
  }
};

const getTotalSalesFromNode = (node) => {
  if (!node) return 0;
  if (node.totalSales === undefined || node.totalSales === null) return 0;

  const rootTotalSales = node.totalSales;

  if (!node.variations) return rootTotalSales;
  if (!node.variations.nodes) return rootTotalSales;
  if (!node.variations.nodes.length === 0) return rootTotalSales;

  const variationTotal = node.variations.nodes.reduce(
    (acc, x) => acc + x.totalSales,
    0
  );

  return Math.max(rootTotalSales, variationTotal);
};

/**
 * We only want to show the instant download button when:
 *  - Root price is 0
 *  - Root downloadable field is true
 *  - Stock quantity is null meaning unlimited
 *  - Root product is in stock
 *  - We have a database ID
 */
const getDownloadProperties = (node) => {
  // This is a redundant call, it would be nice if
  // the code was structured in a way so that we
  // could reuse the data. Its not really a perf concern though
  const price = getPriceFromNode(node);
  if (price !== 0) return { instantDownloadAvailable: false };
  if (!node.downloadable) return { instantDownloadAvailable: false };
  if (node.stockQuantity !== null) return { instantDownloadAvailable: false };
  if (node.stockStatus !== "IN_STOCK")
    return { instantDownloadAvailable: false };
  if (!node.databaseId) return { instantDownloadAvailable: false };

  return {
    instantDownloadAvailable: true,
    downloadUrl: `/?download_file=${node.databaseId}&free=1`,
  };
};

const getImageFromNode = (node) => {
  if (!node.image) return null;

  return getMediaNode(node.image);
};

const getGalleryFromNode = (node) => {
  if (!node.galleryImages) return [];
  if (!node.galleryImages.nodes) return [];

  const isNull = (x) => x !== null;

  return node.galleryImages.nodes
    .map((imageNode) => getMediaNode(imageNode))
    .filter(isNull);
};

const getVariationOverrides = (variations) => {
  // Returning empty objects rather than nulls so that we
  // can always spread the result
  if (!variations) return {};
  if (variations.length === 0) return {};

  const allPrices = variations.map((x) => x.price);
  const allDistinctPrices = new Set(allPrices);

  if (allDistinctPrices.size === 1) {
    return { price: allPrices[0] };
  } else {
    return {
      maxPrice: Math.max(...allPrices),
      minPrice: Math.min(...allPrices),
    };
  }
};

export const getPriceFromNode = (node) => {
  if (node.price === null) return 0;
  if (node.price === undefined) return null;

  const parsedPrice = parseFloat(node.price);

  if (isNaN(parsedPrice)) return null;

  return parsedPrice;
};

const getVariationsFromNode = (node) => {
  if (!node.variations) return null;
  if (!node.variations.nodes) return null;
  if (node.variations.nodes.length === 0) return null;
  if (!node.name) return null;

  const productName = node.name;

  const variations = node.variations.nodes.map((variation) => {
    const withoutParentName = variation.name.replace(`${productName} - `, "");

    const attributes = variation.attributes?.nodes || [];
    const currentName = attributes.map((x) => x.value).join(" - ");

    return {
      id: variation.databaseId,
      name: currentName || withoutParentName,
      slug: variation.slug,
      inStock: isInStock(variation),
      price: getPriceFromNode(variation),
      ...getDownloadProperties(variation),
    };
  });

  return variations;
};
