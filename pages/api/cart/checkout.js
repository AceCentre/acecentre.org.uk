import withSession from "../../../lib/auth/with-session";
import { checkout } from "../../../lib/cart/checkout";

async function handler(req, res) {
  const body = JSON.parse(req.body);

  try {
    const result = await checkout(req, body);
    res.send({ success: true, result });
    return;
  } catch (error) {
    const errors = error?.response?.errors || [];
    const mainError = errors[0] || null;
    const errorMessage = mainError?.message || "An error has occurred";

    res.send({ success: false, error: errorMessage });
    return;
  }
}

export default withSession(handler);
