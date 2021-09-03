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

export async function addToCart(
  req,
  res,
  { productId, variationId, quantity = 1 }
) {
  const response = await clientRequest(req, res, ADD_CART, {
    input: { productId, variationId, quantity: parseInt(quantity) },
  });

  return response.cart;
}
