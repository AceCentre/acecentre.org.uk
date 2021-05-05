import withSession from "../../../lib/auth/with-session";
import { checkout } from "../../../lib/cart/checkout";

async function handler(req, res) {
  const body = JSON.parse(req.body);
  const result = await checkout(req, body);

  res.send({ success: true, result });
}

export default withSession(handler);
