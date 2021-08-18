import { gql } from "graphql-request";
import { clientRequest } from "../client-request";

export const GET_CART = gql`
  query GetCart {
    cart {
      total
      discountTotal
      subtotal
      shippingTotal
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
              ... on VariableProduct {
                soldIndividually
              }

              ... on SimpleProduct {
                soldIndividually
                virtual
                downloadable
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

    const allowQuantityEditing =
      product.soldIndividually === true ? false : true;

    const moodleCourses = product?.moodleCourses?.nodes || [];

    const type = moodleCourses.length > 0 ? "Course" : "Resource";

    const resourceHref =
      moodleCourses.length > 0
        ? `/learning/${product.slug}`
        : `/resources/${product.slug}`;

    return {
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
    };
  });

  // The order only needs delivered if more than one product needs delivered
  const needsDelivered = lines.filter((x) => x.needsDelivered).length > 0;

  return {
    lines,
    subtotal: response.cart.subtotal,
    shipping: response.cart.shippingTotal,
    total: response.cart.total,
    discountTotal: response.cart.discountTotal,
    needsDelivered,
  };
}
