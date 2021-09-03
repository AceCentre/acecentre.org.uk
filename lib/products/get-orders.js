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
              product {
                id
                name
                slug
                moodleCourses {
                  nodes {
                    id
                  }
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
  }
`;

export const getOrderCount = async (req, res, user) => {
  const response = await clientRequest(req, res, GetOrderCount, {
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

export const getOrders = async (req, res, user) => {
  const response = await clientRequest(req, res, GetOrders, {
    id: user.customerId,
  });

  if (response.loggedOut) {
    return null;
  }

  return response.customer.orders.nodes.map((order) => {
    const lines = order.lineItems.nodes.map((line) => {
      const moodleProduct = isMoodleProduct(line.product);
      return {
        name: line.product.name,
        quantity: line.quantity,
        total: line.total == null ? "Free" : `£${line.total}`,
        type: moodleProduct ? "Course" : "Resource",
        href: `/${moodleProduct ? "learning" : "resources"}/${
          line.product.slug
        }`,
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
