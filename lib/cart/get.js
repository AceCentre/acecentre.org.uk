import { gql } from "graphql-request";
import { clientRequest } from "../client-request";

export const GET_CART = gql`
  query GetCart {
    cart {
      total
      shippingTax
      shippingTotal
      contents {
        nodes {
          variation {
            node {
              id
              name
            }
          }
          product {
            node {
              ... on VariableProduct {
                soldIndividually
              }

              ... on SimpleProduct {
                soldIndividually
              }

              moodleCourses {
                nodes {
                  id
                }
              }
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
      name,
      quantity: line.quantity,
      allowQuantityEditing,
      type,
      price: line.total === "£0.00" ? "Free" : line.total,
      resourceHref,
    };
  });

  return { lines };
}
