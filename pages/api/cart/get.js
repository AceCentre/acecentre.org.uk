import withSession from "../../../lib/auth/with-session";
import { getCart } from "../../../lib/cart/get";

async function handler(req, res) {
  const cart = await getCart(req, res);

  res.send({ cart });
}

export default withSession(handler);
