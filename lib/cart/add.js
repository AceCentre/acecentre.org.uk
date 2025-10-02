//import config from "../config";
import { gql } from "graphql-request";
import { clientRequest } from "../client-request";

// GraphQL mutation to add item to cart (loader-safe version)
const ADD_TO_CART = gql`
  mutation AddToCart($productId: Int!, $quantity: Int) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      cart {
        total
      }
    }
  }
`;

// Fall back to GraphQL since Store API requires nonce that's not available
export async function addToCart(req, { productId, variationId, quantity = 1 }) {
  const id = variationId || productId;

  console.log("[addToCart] Using GraphQL with productId:", id);

  try {
    const response = await clientRequest(req, ADD_TO_CART, {
      productId: parseInt(id, 10),
      quantity: parseInt(quantity, 10),
    });

    console.log("[addToCart] GraphQL response:", response);
    return response.addToCart;
  } catch (error) {
    console.error("[addToCart] GraphQL error:", error);
    throw error;
  }
}
