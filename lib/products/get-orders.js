import { clientRequest } from "../client-request";
import { gql } from "graphql-request";
import { isMoodleProduct } from "./get-products";

const GetOrderCount = gql`
  query GetOrderCount($customerId: Int!) {
    orders(where: { customerId: $customerId }, first: 1000) {
      nodes {
        databaseId
      }
    }
  }
`;

const GetOrders = gql`
  query GetOrders($customerId: Int!) {
    orders(where: { customerId: $customerId }, first: 1000) {
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
            # Prefer core WooGraphQL product field to avoid plugin dependency
            product {
              node {
                __typename
                id
                name
                slug
              }
            }
            quantity
            total
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
`;

export const getOrderCount = async (req, user) => {
  // customerId arrives base64-encoded like "customerId:1090" → need Int
  let customerIdInt = null;
  try {
    const decoded = Buffer.from(user.customerId, "base64").toString("utf-8");
    // Support both "customerId:1090" and "customer:1090" or any base64 that contains digits
    const match = decoded.match(/(\d+)/);
    customerIdInt = match ? parseInt(match[1], 10) : null;
  } catch (e) {
    customerIdInt = null;
  }

  if (!customerIdInt || Number.isNaN(customerIdInt)) return 0;

  let response;
  try {
    response = await clientRequest(req, GetOrderCount, {
      customerId: customerIdInt,
    });
  } catch (error) {
    const message = error?.response?.errors?.[0]?.message || "";
    // If orders top-level loader isn't available, treat as zero orders
    if (message.includes("No loader assigned to the key wc_post")) {
      return 0;
    }
    // Otherwise, bubble up
    throw error;
  }

  if (response.loggedOut) {
    return null;
  }

  if (response && response.orders && response.orders.nodes) {
    return response.orders.nodes.length;
  }

  return 0;
};

export const getOrders = async (req, user) => {
  // Decode base64 customerId to Int
  let customerIdInt = null;
  try {
    const decoded = Buffer.from(user.customerId, "base64").toString("utf-8");
    const match = decoded.match(/(\d+)/);
    customerIdInt = match ? parseInt(match[1], 10) : null;
  } catch (e) {
    customerIdInt = null;
  }

  if (!customerIdInt || Number.isNaN(customerIdInt)) return [];

  let response;
  try {
    response = await clientRequest(req, GetOrders, {
      customerId: customerIdInt,
    });
  } catch (error) {
    const errorList = error?.response?.errors;
    const validErrors = errorList?.filter((error) => {
      return (
        !error.message.includes("product type is not supported") &&
        !error.message.includes('Cannot query field "productForLine"')
      );
    });

    if (validErrors?.length > 0) {
      throw error;
    }

    response = error.response.data;
  }

  if (response.loggedOut) {
    return null;
  }

  return response.orders.nodes.map((order) => {
    const lines = order.lineItems.nodes.map((line) => {
      const product = line.product?.node || { slug: "unknown" };

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
        total: line.total == null ? "Free" : line.total,
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
