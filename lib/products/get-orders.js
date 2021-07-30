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

export const getOrderCount = async (req, user) => {
  const response = await clientRequest(req, GetOrderCount, {
    id: user.customerId,
  });

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
