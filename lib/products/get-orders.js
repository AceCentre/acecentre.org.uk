import { clientRequest } from "../client-request";
import { gql } from "graphql-request";
import { isMoodleProduct } from "./get-products";

const GetOrderCount = gql`
  query GetOrderCount($id: ID!) {
    customer(id: $id) {
      orders(first: 1000) {
        nodes {
          databaseId
        }
      }
    }
  }
`;

const GetOrders = gql`
  query GetOrders($id: ID!) {
    customer(id: $id) {
      orders(first: 1000) {
        nodes {
          databaseId
          createdVia
          currency
          date
          status
          total
          subtotal
          lineItems {
            nodes {
              productForLine {
                nodes {
                  __typename
                  id
                  name
                  slug
                  moodleCourses {
                    nodes {
                      id
                    }
                  }
                }
              }
              quantity
              customTotal
            }
          }
          billing {
            firstName
            lastName
            phone
            email
          }
        }
      }
    }
  }
`;

export const getOrderCount = async (req, user) => {
  const response = await clientRequest(req, GetOrderCount, {
    id: user.customerId,
  });

  if (response.loggedOut) {
    return null;
  }

  if (
    response &&
    response.customer &&
    response.customer.orders &&
    response.customer.orders.nodes
  ) {
    return response.customer.orders.nodes.length;
  }

  return 0;
};

export const getOrders = async (req, user) => {
  let response;
  try {
    response = await clientRequest(req, GetOrders, {
      id: user.customerId,
    });
  } catch (error) {
    const errorList = error?.response?.errors;
    const validErrors = errorList?.filter((error) => {
      return !error.message.includes("product type is not supported");
    });

    if (validErrors?.length > 0) {
      throw error;
    }

    response = error.response.data;
  }

  if (response.loggedOut) {
    return null;
  }

  return response.customer.orders.nodes.map((order) => {
    const lines = order.lineItems.nodes.map((line) => {
      let product = { slug: "unknown" };

      if (
        line &&
        line.productForLine &&
        line.productForLine.nodes &&
        line.productForLine.nodes[0]
      ) {
        product = line.productForLine.nodes[0];
      }

      const moodleProduct = isMoodleProduct(product);

      let type = moodleProduct ? "Course" : "Resource";
      let urlPrefix = moodleProduct ? "learning" : "resources";

      if (product.__typename === "BundleProduct") {
        type = "Bundle";
        urlPrefix = "learning";
      }

      return {
        name: product.name || "Unknown",
        quantity: line.quantity,
        total: line.customTotal == null ? "Free" : `£${line.customTotal}`,
        type,
        href: `/${urlPrefix}/${product.slug || "all"}`,
      };
    });

    return {
      id: order.databaseId,
      status: toTitleCase(order.status),
      date: order.date,
      cost: order.total === "£0.00" ? "Free" : order.total,
      lines,
    };
  });
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
