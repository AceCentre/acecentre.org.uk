import withSession from "../../../lib/auth/with-session";
import { getCart } from "../../../lib/cart/get";

async function handler(req, res) {
  try {
    const woo = (req.session.get("cart") || {}).wooSessionToken || null;
    const cart = await getCart(req);
    return res.status(200).json({ success: true, wooSessionToken: woo, cart });
  } catch (error) {
    console.error("/api/cart/view error:", error);
    return res
      .status(200)
      .json({ success: false, error: error?.message || "Unknown error" });
  }
}

export default withSession(handler);
