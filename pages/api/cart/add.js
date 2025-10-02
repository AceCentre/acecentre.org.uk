import withSession from "../../../lib/auth/with-session";
import { addToCart } from "../../../lib/cart/add";
import { getCart } from "../../../lib/cart/get";

async function handler(req, res) {
  let body;
  if (typeof req.body === "string") {
    body = JSON.parse(req.body);
  } else {
    body = req.body;
  }

  const productId = body.productId;
  const variationId = body.variationId || null;
  const quantity = body.quantity || 1;
  const isCourse = body.isCourse || false;

  if (!productId) {
    return res.send({ success: false, error: "No product ID supplied" });
  }

  try {
    if (isCourse) {
      const cart = await getCart(req);
      for (const line of cart.lines) {
        if (line.type.toLowerCase() === "course") {
          return res.send({
            success: false,
            error:
              "You can only add one course to your cart at a time. Checkout with the current course first then return to buy this course.",
          });
        }
      }
    }

    const result = await addToCart(req, { productId, variationId, quantity });
    res.send({ success: true, result });
  } catch (error) {
    const message =
      error?.response?.errors?.[0]?.message ||
      error?.message ||
      "Unknown error";
    // Log full error for server diagnostics
    console.log("Add to cart error:", message, error?.response?.errors);
    return res.status(200).send({ success: false, error: message });
  }
}

export default withSession(handler);
