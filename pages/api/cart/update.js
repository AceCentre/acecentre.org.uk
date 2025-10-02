import { gql } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import { clientRequest } from "../../../lib/client-request";

const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        total
      }
    }
  }
`;

export const EMPTY_CART = gql`
  mutation EmptyCart {
    emptyCart(input: {}) {
      cart {
        total
      }
    }
  }
`;

async function handler(req, res) {
  try {
    console.log("[cart/update] Raw request body:", req.body);
    console.log("[cart/update] Request body type:", typeof req.body);

    let body;
    if (typeof req.body === "string") {
      body = JSON.parse(req.body);
    } else {
      body = req.body;
    }

    console.log("[cart/update] Parsed request body:", body);

    // The frontend now sends cart items with productId and variationId
    const items = body.items
      .filter((item) => item.quantity > 0)
      .map((item) => {
        const cartItem = {
          quantity: item.quantity,
          productId: item.productId,
        };

        // Only include variationId if it's not null/undefined
        if (item.variationId) {
          cartItem.variationId = item.variationId;
        }

        return cartItem;
      });

    console.log("[cart/update] Items to update:", items);

    let itemsWithVariations = null;

    // Get current cart to debug what's actually in it
    try {
      const { getCart } = await import("../../../lib/cart/get");
      const currentCart = await getCart(req);
      console.log(
        "[cart/update] Current cart before update:",
        currentCart.lines.map((line) => ({
          key: line.key,
          productId: line.productId,
          name: line.name,
          quantity: line.quantity,
        }))
      );

      // If cart is empty and we're trying to update items, return success
      if (currentCart.lines.length === 0 && items.length > 0) {
        console.log("[cart/update] Cart is empty, cannot update items");
        return res.send({
          success: true,
          message: "Cart is empty, nothing to update",
        });
      }

      // Map the update items to include variation information from current cart
      itemsWithVariations = items.map((updateItem) => {
        const currentItem = currentCart.lines.find(
          (line) => line.key === updateItem.key
        );
        if (currentItem) {
          return {
            ...updateItem,
            variationId: currentItem.variationId || null,
          };
        }
        return updateItem;
      });

      console.log("[cart/update] Items with variations:", itemsWithVariations);
    } catch (error) {
      console.log("[cart/update] Could not get current cart:", error.message);
    }

    // Use itemsWithVariations if available, otherwise fall back to items
    const finalItems = itemsWithVariations || items;

    // Only empty cart if there are items to remove
    if (finalItems.length === 0) {
      console.log("[cart/update] No items to update, just emptying cart...");
      try {
        await clientRequest(req, EMPTY_CART);
      } catch (error) {
        // Cart might already be empty, which is fine
        console.log(
          "[cart/update] Cart was already empty or emptying failed:",
          error.message
        );
      }
    } else {
      console.log("[cart/update] Emptying cart...");
      try {
        await clientRequest(req, EMPTY_CART);
      } catch (error) {
        // Cart might already be empty, which is fine
        console.log(
          "[cart/update] Cart was already empty or emptying failed:",
          error.message
        );
      }

      console.log("[cart/update] Adding items to cart...");
      for (const item of finalItems) {
        const input = {
          productId: item.productId,
          quantity: item.quantity,
        };

        // Only include variationId if it exists
        if (item.variationId) {
          input.variationId = item.variationId;
        }

        console.log("[cart/update] Adding item:", input);
        await clientRequest(req, ADD_TO_CART, { input });
      }
    }

    console.log("[cart/update] Update successful");
    res.send({ success: true });
  } catch (error) {
    console.error("[cart/update] Error:", error);
    res.status(500).send({ success: false, error: error.message });
  }
}

export default withSession(handler);
