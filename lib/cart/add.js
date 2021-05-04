import { clientRequest } from "../client-request";
import { gql } from "graphql-request";

const ADD_CART = gql`
  mutation addToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
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
  }
`;

export async function addToCart(req, { productId, variationId }) {
  const response = await clientRequest(req, ADD_CART, {
    input: { productId, variationId },
  });

  return response.cart;
}
