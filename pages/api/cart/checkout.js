import withSession from "../../../lib/auth/with-session";
import { checkout } from "../../../lib/cart/checkout";

async function handler(req, res) {
  const body = JSON.parse(req.body);
  const stripeSourceId = body.stripeSourceId;

  if (!stripeSourceId) {
    return res.send({ success: false, error: "No Stripe ID" });
  }

  const result = await checkout(req, { stripeSourceId });

  res.send({ success: true, result });
}

export default withSession(handler);
