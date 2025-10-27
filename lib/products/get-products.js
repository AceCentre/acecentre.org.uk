import { gql } from "graphql-request";

import { request } from "../data-fetching";

import { getMediaNode } from "../utils/get-media-node";
import config from "../config";
import { getFeaturedImage, getMainCategoryName } from "../posts/get-posts";

const ENDPOINT = `${config.baseUrl}/graphql`;

// Frontend origin used to construct absolute download URLs so clicks always
// hit the server that serves Next.js API routes (not the WP backend or a
// static host). Falls back to sensible defaults per environment.
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://acecentre.org.uk");

// Safe request wrapper to handle GraphQL errors gracefully
const safeRequest = async (endpoint, query, variables) => {
  try {
    return await request(endpoint, query, variables);
  } catch (error) {
    console.warn(
      "GraphQL request failed:",
      error?.response?.errors || error.message
    );

    // If it's a GraphQL error with specific product issues, try to continue
    const errors = error?.response?.errors || [];
    const hasProductError = errors.some(
      (err) =>
        err.path &&
        err.path.some(
          (segment) =>
            segment === "products" ||
            segment === "nodes" ||
            segment === "meta" ||
            segment === "faqs"
        )
    );

    if (hasProductError) {
      console.warn(
        "Detected product-specific GraphQL error, returning empty products array"
      );

      // Log detailed error information to identify the problematic product
      errors.forEach((err, index) => {
        console.error(`GraphQL Error ${index + 1}:`, {
          message: err.message,
          path: err.path,
          locations: err.locations,
        });

        // Try to extract product index from the path
        if (err.path && err.path.includes("nodes")) {
          const nodeIndex = err.path.findIndex(
            (segment) => segment === "nodes"
          );
          if (nodeIndex !== -1 && err.path[nodeIndex + 1] !== undefined) {
            console.error(
              `Error is in product at index: ${err.path[nodeIndex + 1]}`
            );
          }
        }
      });

      return { products: { nodes: [] } };
    }

    const data = error?.response?.data;
    if (data) return data;
    throw error;
  }
};

// Optimized query for resources page - fetches only essential data
export const GetResourcesOptimized = gql`
  query GetResourcesOptimized {
    products(first: 200) {
      nodes {
        __typename
        databaseId
        slug
        name
        shortDescription
        description
        featured
        totalSales
        catalogVisibility
        price(format: RAW)
        stockStatus
        stockQuantity
        downloadable
        soldIndividually
        image {
          altText
          sourceUrl
          mediaDetails {
            width
            height
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
          outOfStockForm
          popupFormBehaviour
          launchpadSlug
          ibook
          epubLocation
          epubViewLocation
        }
        ... on SimpleProduct {
          price(format: RAW)
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
        ... on VariableProduct {
          databaseId
          soldIndividually
          variations(first: 100) {
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
            }
          }
        }
      }
    }
  }
`;

// Only use this query from staticProps calls
// because its a intensive query
export const GetFirstHundred = gql`
  query FirstOneHundred {
    products(first: 100) {
      nodes {
        __typename
        menuOrderRaw
        catalogVisibility
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
          faqs {
            answer
            question
          }
          launchpadSlug
          ibook
          epubLocation
          epubViewLocation
          popupFormBehaviour
          thumbnailImage {
            altText
            mediaDetails {
              width
              height
            }
            sourceUrl
          }
          outOfStockForm
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
        modified

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

        # Lightweight attachedResources query - only UI data needed
        attachedResources {
          nodes {
            slug
            name
            image {
              altText
              sourceUrl
              mediaDetails {
                width
                height
              }
            }
            productCategories {
              nodes {
                name
              }
            }
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
          price(format: RAW)
          soldIndividually
          downloadable
          stockStatus
          stockQuantity
          databaseId
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
              ... on SimpleProduct {
                price(format: RAW)
                soldIndividually
                downloadable
                stockStatus
                stockQuantity
                databaseId
              }
              slug
              name
              totalSales
              featured
              shortDescription
              description
              date
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

export const GetLastHundred = gql`
  query LastOneHundred {
    products(last: 100) {
      nodes {
        __typename
        menuOrderRaw
        catalogVisibility
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
          launchpadSlug
          ibook
          epubLocation
          epubViewLocation
          popupFormBehaviour
          thumbnailImage {
            altText
            mediaDetails {
              width
              height
            }
            sourceUrl
          }
          outOfStockForm
          faqs {
            answer
            question
          }
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
        modified

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
          price(format: RAW)
          soldIndividually
          downloadable
          stockStatus
          stockQuantity
          databaseId
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
              ... on SimpleProduct {
                price(format: RAW)
                soldIndividually
                downloadable
                stockStatus
                stockQuantity
                databaseId
              }
              slug
              name
              totalSales
              featured
              shortDescription
              description
              date
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

export const isMoodleBundle = (product) => {
  if (product.__typename !== "BundleProduct") return false;
  if (!product.bundled) return false;
  if (!product.bundled.nodes) return false;

  const bundledProducts = product.bundled.nodes;

  for (const current of bundledProducts) {
    if (isMoodleBundle(current)) return false;
  }

  return true;
};

export const isMoodleProduct = () => {
  // Edwiser Bridge is deactivated, so no Moodle products are available
  return false;
};

const FILTER_LIST = ["developing-using-communication-book-templates"];

// Function to identify the problematic product by testing individual queries
const identifyProblematicProduct = async () => {
  console.log("Testing individual products to find the problematic one...");

  // Test the first 100 products individually
  for (let i = 0; i < 100; i++) {
    try {
      const testQuery = gql`
        query TestProduct${i} {
          products(first: 1, skip: ${i}) {
            nodes {
              slug
              name
              meta {
                faqs {
                  answer
                  question
                }
              }
            }
          }
        }
      `;

      const response = await request(ENDPOINT, testQuery);

      if (response.products.nodes.length > 0) {
        const product = response.products.nodes[0];
        console.log(`Product ${i}: ${product.name} (${product.slug}) - OK`);
      }
    } catch (error) {
      console.error(
        `Product ${i}: ERROR - ${
          error?.response?.errors?.[0]?.message || error.message
        }`
      );

      // Try to get the product name even if FAQs fail
      try {
        const nameQuery = gql`
          query GetProductName${i} {
            products(first: 1, skip: ${i}) {
              nodes {
                slug
                name
              }
            }
          }
        `;

        const nameResponse = await request(ENDPOINT, nameQuery);
        if (nameResponse.products.nodes.length > 0) {
          const product = nameResponse.products.nodes[0];
          console.error(
            `PROBLEMATIC PRODUCT FOUND: ${product.name} (${product.slug}) at index ${i}`
          );
          return { name: product.name, slug: product.slug, index: i };
        }
      } catch (nameError) {
        console.error(`Could not get name for product ${i}`);
      }
    }
  }

  console.log("Could not identify the problematic product");
  return null;
};

// Exclude any products whose slug contains these substrings
const EXCLUDED_SLUG_SUBSTRINGS = ["learnin", "moodlecourse"]; // e.g. "learning" or "moodlecourse"

const isExcludedBySubstring = (slug) => {
  if (!slug) return false;
  const lower = String(slug).toLowerCase();
  return EXCLUDED_SLUG_SUBSTRINGS.some((fragment) => lower.includes(fragment));
};

// Optimized version for resources page
export const getAllProductsOptimized = async (allowAll = false) => {
  const response = await safeRequest(ENDPOINT, GetResourcesOptimized);

  const nodes = response.products.nodes;

  const productNodes = nodes.filter((product) => {
    if (isMoodleProduct(product)) return false;
    if (product.__typename == "BundleProduct") return false;
    return true;
  });

  const allWooProducts = productNodes
    .map(getProductFromNode)
    // Exclude Learning category and moodle-related slugs
    .filter((current) => {
      // Filter out Learning category products (check by name since slug might be null)
      return !(current.category && current.category.name === "Learning");
    })
    .filter((current) => allowAll || !FILTER_LIST.includes(current.slug))
    .filter((current) => !isExcludedBySubstring(current.slug))
    .filter((current) => allowAll || current.catalogVisibility !== "CATALOG");

  return allWooProducts;
};

export const getAllProducts = async (allowAll = false) => {
  try {
    const queryFirstResponse = await safeRequest(ENDPOINT, GetFirstHundred);
    const queryLastResponse = await safeRequest(ENDPOINT, GetLastHundred);

    const nodes = [
      ...queryFirstResponse.products.nodes,
      ...queryLastResponse.products.nodes,
    ].filter((v, i, a) => a.findIndex((v2) => v2.slug === v.slug) === i);

    if (nodes.length === 200) {
      throw new Error("Not getting enough products!");
    }

    const productNodes = nodes.filter((product) => {
      if (isMoodleProduct(product)) return false;

      if (product.__typename == "BundleProduct") return false;

      return true;
    });

    const allWooProducts = productNodes
      .map(getProductFromNode)
      // Exclude Learning category and moodle-related slugs
      .filter((current) => {
        // Filter out Learning category products (check by name since slug might be null)
        return !(current.category && current.category.name === "Learning");
      })
      .filter((current) => allowAll || !FILTER_LIST.includes(current.slug))
      .filter((current) => !isExcludedBySubstring(current.slug))
      .filter((current) => allowAll || current.catalogVisibility !== "CATALOG");

    return allWooProducts;
  } catch (error) {
    console.error("Error in getAllProducts:", error);

    // If we get an error, try to identify the problematic product
    if (error?.response?.errors) {
      console.log("Attempting to identify problematic product...");
      await identifyProblematicProduct();
    }

    throw error;
  }
};

export const getAllProductsByPopularity = async () => {
  const allProducts = await getAllProducts();

  return allProducts.sort((a, b) => b.totalSales - a.totalSales);
};

export const getOutOfStockForm = (node) => {
  if (!node) return null;
  if (!node.meta) return null;
  if (!node.meta.outOfStockForm) return null;

  return node.meta.outOfStockForm;
};

const getFaqsFromNode = (node) => {
  if (!node) return [];
  if (!node.meta) return [];
  if (!node.meta.faqs) return [];
  if (!Array.isArray(node.meta.faqs)) return [];

  return node.meta.faqs;
};

const getAttachedResourceFromNode = (node) => {
  return {
    slug: node.slug,
    name: node.name,
    title: node.name, // ResourceList component expects 'title'
    image: getImageFromNode(node),
    featuredImage: getImageFromNode(node), // ResourceList component expects 'featuredImage'
    mainCategoryName: node.productCategories?.nodes?.[0]?.name || "",
  };
};

export const getProductFromNode = (node) => {
  const variations = getVariationsFromNode(node);

  // Get attached resources with minimal data for UI display
  const attachedNodes = node.attachedResources?.nodes || [];

  return {
    id: node.databaseId,
    menuOrder: node.menuOrderRaw || null,
    faqs: getFaqsFromNode(node),
    outOfStockForm: getOutOfStockForm(node),
    date: node.modified,
    slug: node.slug,
    name: node.name,
    description: node.description || null,
    shortDescription: node.shortDescription || null,
    attachedResources: attachedNodes.map(getAttachedResourceFromNode),
    featured: node.featured || false,
    totalSales: getTotalSalesFromNode(node),
    price: getPriceFromNode(node),
    variations: getVariationsFromNode(node),
    image: getImageFromNode(node),
    gallery: getGalleryFromNode(node),
    inStock: isInStock(node),
    catalogVisibility: node.catalogVisibility || null,
    popupFormBehaviour: node?.meta?.popupFormBehaviour || null,
    thumbnailImage: getThumbnailImageFromNode(node),

    category: getCategoryFromNode(node),

    projects: getProjectFromNode(node),

    ebook: getEbookFromNode(node),

    ...getLaunchpadProperties(node),

    ...getDownloadProperties(node),

    // We want to override some root properties
    // like price, minPrice and maxPrice depending on the variations
    ...getVariationOverrides(variations),

    ...getExternalOptions(node),
  };
};

const getLaunchpadProperties = (node) => {
  if (node && node.meta && node.meta.launchpadSlug) {
    return {
      isLaunchpadTemplate: true,
      launchpadSlug: node.meta.launchpadSlug,
    };
  }

  return { isLaunchpadTemplate: false };
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
    slug: null,
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
    const gp = mainCategory.parent.node.parent.node;
    return { name: gp.name, slug: gp.slug || null };
  }

  if (
    mainCategory.parent &&
    mainCategory.parent.node &&
    mainCategory.parent.node.name
  ) {
    const p = mainCategory.parent.node;
    return { name: p.name, slug: p.slug || null };
  }

  if (mainCategory.name) {
    return { name: mainCategory.name, slug: mainCategory.slug || null };
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
    downloadUrl:
      process.env.NODE_ENV === "test"
        ? `/api/download?download_file=${node.databaseId}&free=1`
        : `${FRONTEND_ORIGIN}/api/download?download_file=${node.databaseId}&free=1`,
  };
};

export const getImageFromNode = (node) => {
  if (!node.image) return null;

  return getMediaNode(node.image);
};

export const getThumbnailImageFromNode = (node) => {
  if (!node) return null;
  if (!node.meta) return null;
  if (!node.meta.thumbnailImage) return null;

  return getMediaNode(node.meta.thumbnailImage);
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
      popupFormBehaviour: node?.meta?.popupFormBehaviour || null,
      outOfStockForm: getOutOfStockForm(node),
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
