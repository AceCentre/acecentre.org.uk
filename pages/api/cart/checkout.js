import withSession from "../../../lib/auth/with-session";
import { checkout } from "../../../lib/cart/checkout";
import { addToMailingList } from "../auth/register";

async function handler(req, res) {
  const body = JSON.parse(req.body);

  try {
    // Add to mailing list
    if (body.addToMailingList) {
      await addToMailingList(body.billingDetails.email);
    }

    const result = await checkout(req, body);

    // Delete cart

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
