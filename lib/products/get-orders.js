import { clientRequest } from "../client-request";
import { gql } from "graphql-request";

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
          total(format: RAW)
          subtotal(format: RAW)
          lineItems {
            nodes {
              product {
                id
                name
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
  const response = await clientRequest(req, GetOrders, {
    id: user.customerId,
  });

  if (response.loggedOut) {
    return null;
  }

  return 0;
};
