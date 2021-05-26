import request, { gql } from "graphql-request";
import { getMediaNode } from "../utils/get-media-node";
import config from "../config";

const ENDPOINT = `${config.baseUrl}/graphql`;

const NO_OF_PRODUCTS_TO_FETCH = 150;

// Only use this query from staticProps calls
// because its a intensive query
const GetAllProductsQuery = gql`
  query AllProducts {
    products(first: ${NO_OF_PRODUCTS_TO_FETCH}) {
      nodes {
        slug
        name
        totalSales
        featured
        description

        moodleCourses {
          nodes {
            id
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

          downloadable
          stockStatus
          stockQuantity
          databaseId
        }
        
        ... on ExternalProduct {
          price(format: RAW)
          databaseId
        }
        
        ... on VariableProduct {
          databaseId
          variations {
            nodes { 
              name
              id
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

const isMoodleProduct = (product) => {
  if (!product) return false;
  if (!product.moodleCourses) return false;
  if (!product.moodleCourses.nodes) return false;
  if (product.moodleCourses.nodes.length == 0) return false;

  return true;
};

export const getAllProducts = async () => {
  const queryResponse = await request(ENDPOINT, GetAllProductsQuery);
  const productNodes = queryResponse.products.nodes.filter(
    (product) => !isMoodleProduct(product)
  );

  // This doesnt make any sense
  if (productNodes.length > NO_OF_PRODUCTS_TO_FETCH) {
    throw new Error(
      "There are more products than we requested. Increase the number of products to fetch"
    );
  }

  return productNodes.map(getProductFromNode);
};

export const getAllProductsByPopularity = async () => {
  const allProducts = await getAllProducts();

  return allProducts.sort((a, b) => b.totalSales - a.totalSales);
};

export const getProductFromNode = (node) => {
  const variations = getVariationsFromNode(node);

  return {
    id: node.databaseId,
    slug: node.slug,
    name: node.name,
    description: node.description || null,
    featured: node.featured || false,
    totalSales: getTotalSalesFromNode(node),
    price: getPriceFromNode(node),
    variations: getVariationsFromNode(node),
    image: getImageFromNode(node),
    gallery: getGalleryFromNode(node),

    ...getDownloadProperties(node),

    // We want to override some root properties
    // like price, minPrice and maxPrice depending on the variations
    ...getVariationOverrides(variations),
  };
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

const getPriceFromNode = (node) => {
  if (node.price === null) return 0;
  if (node.price === undefined) return null;

  const parsedPrice = parseInt(node.price);

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
    return {
      id: variation.databaseId,
      name: withoutParentName,
      price: getPriceFromNode(variation),
      ...getDownloadProperties(variation),
    };
  });

  return variations;
};
