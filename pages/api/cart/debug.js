import withSession from "../../../lib/auth/with-session";
import { getCart } from "../../../lib/cart/get";

async function handler(req, res) {
  try {
    // Get the full session info
    const user = req.session.get("user") || {};
    const cart = req.session.get("cart") || {};

    // Get the cart from GraphQL
    const cartData = await getCart(req);

    // Return debug info
    res.json({
      success: true,
      session: {
        hasUser: !!user.userId,
        hasWooSession: !!cart.wooSessionToken,
        wooSessionToken: cart.wooSessionToken?.substring(0, 20) + "..." || null,
      },
      cart: cartData,
      cookies: req.headers.cookie || "no cookies",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
}

export default withSession(handler);
