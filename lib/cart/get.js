import { gql } from "graphql-request";
import { clientRequest } from "../client-request";

export const GET_CART = gql`
  query GetCart {
    cart {
      total
      discountTotal
      subtotal
      shippingTotal
      totalTax
      contents {
        nodes {
          variation {
            node {
              databaseId
              id
              name
              virtual
              downloadable
            }
          }
          product {
            node {
              __typename
              ... on VariableProduct {
                soldIndividually
              }

              ... on SimpleProduct {
                soldIndividually
                virtual
                downloadable
              }

              ... on BundleProduct {
                bundled {
                  nodes {
                    slug
                  }
                }
              }

              moodleCourses {
                nodes {
                  id
                }
              }
              databaseId
              id
              name
              slug
              courseGroupPurchase
            }
          }

          quantity
          total
          subtotal
        }
        itemCount
      }
    }
  }
`;

export async function getCart(req) {
  const response = await clientRequest(req, GET_CART);

  const rawLines = response.cart.contents.nodes || [];

  let bundleSlugs = [];

  const lines = rawLines.map((line) => {
    const product = line.product?.node || null;
    const variation = line.variation?.node || null;

    let needsDelivered = true;

    if (product && (product.downloadable || product.virtual)) {
      needsDelivered = false;
    }

    if (variation && (variation.downloadable || variation.virtual)) {
      needsDelivered = false;
    }

    let name = product.name;

    if (variation && variation.name) {
      name = variation.name;
    }

    let allowQuantityEditing = product.soldIndividually === true ? false : true;

    const moodleCourses = product?.moodleCourses?.nodes || [];

    let type = moodleCourses.length > 0 ? "Course" : "Resource";

    if (product.__typename === "BundleProduct") {
      type = "Bundle";
      allowQuantityEditing = false;
      if (product && product.bundled && product.bundled.nodes) {
        bundleSlugs = [
          ...bundleSlugs,
          ...product.bundled.nodes.map((bundle) => bundle.slug),
        ];
      }
    }

    const resourceHref =
      moodleCourses.length > 0
        ? `/learning/${product.slug}`
        : `/resources/${product.slug}`;

    return {
      slug: product.slug,
      key: [product.databaseId, variation?.databaseId]
        .filter((x) => !!x)
        .join("-"),
      name,
      quantity: line.quantity,
      allowQuantityEditing,
      type,
      price: line.total === "£0.00" ? "Free" : line.total,
      resourceHref,
      needsDelivered,

      // Needs actually calculated
      groupPurchase: product.courseGroupPurchase,
      lockQuantityEditing: false,
    };
  });

  for (const line of lines) {
    if (bundleSlugs.includes(line.slug)) {
      line.lockQuantityEditing = true;
    }
  }

  // The order only needs delivered if more than one product needs delivered
  const needsDelivered = lines.filter((x) => x.needsDelivered).length > 0;

  return {
    lines,
    subtotal: response.cart.subtotal,
    vat: response.cart.totalTax,
    shipping: response.cart.shippingTotal,
    total: response.cart.total,
    discountTotal: response.cart.discountTotal,
    needsDelivered,
  };
}
