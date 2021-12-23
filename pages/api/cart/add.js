import withSession from "../../../lib/auth/with-session";
import { addToCart } from "../../../lib/cart/add";
import { getCart } from "../../../lib/cart/get";

async function handler(req, res) {
  const body = JSON.parse(req.body);
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
    console.log(error);
    res.send({ success: false });
    throw error;
  }
}

export default withSession(handler);
