import { gql } from "graphql-request";
import { clientRequest } from "../client-request";

const GET_CART = gql`
  query GetCart {
    cart {
      contents {
        nodes {
          product {
            node {
              name
            }
          }
        }
      }
    }
  }
`;

export async function getCart(req) {
  const response = await clientRequest(req, GET_CART);

  return response.cart;
}
