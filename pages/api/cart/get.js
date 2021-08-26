import withSession from "../../../lib/auth/with-session";
import { getCart } from "../../../lib/cart/get";
import { withSentry } from "@sentry/nextjs";

async function handler(req, res) {
  const cart = await getCart(req);

  res.send({ cart });
}

export default withSentry(withSession(handler));
