import withSession from "../../../lib/auth/with-session";
import { addToCart } from "../../../lib/cart/add";
import { withSentry } from "@sentry/nextjs";

async function handler(req, res) {
  const body = JSON.parse(req.body);
  const productId = body.productId;
  const variationId = body.variationId || null;

  if (!productId) {
    return res.send({ success: false, error: "No product ID supplied" });
  }

  const result = await addToCart(req, { productId, variationId });

  res.send({ success: true, result });
}

export default withSentry(withSession(handler));
