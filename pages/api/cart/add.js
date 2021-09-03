import withSession from "../../../lib/auth/with-session";
import { addToCart } from "../../../lib/cart/add";

async function handler(req, res) {
  const body = JSON.parse(req.body);
  const productId = body.productId;
  const variationId = body.variationId || null;
  const quantity = body.quantity || 1;

  if (!productId) {
    return res.send({ success: false, error: "No product ID supplied" });
  }

  const result = await addToCart(req, res, {
    productId,
    variationId,
    quantity,
  });

  res.send({ success: true, result });
}

export default withSession(handler);
