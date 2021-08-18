import withSession from "../../../lib/auth/with-session";
import { checkout, updateCustomer } from "../../../lib/cart/checkout";
import { clientRequest } from "../../../lib/client-request";
import { addToMailingList } from "../auth/register";
import { EMPTY_CART } from "./update";

async function handler(req, res) {
  const body = JSON.parse(req.body);

  let result;
  try {
    // Add to mailing list
    if (body.addToMailingList) {
      await addToMailingList(body.billingDetails.email);
    }

    await updateCustomer(req, body);
    result = await checkout(req, body);
    await clientRequest(req, EMPTY_CART);

    res.send({ success: true, result });
    return;
  } catch (error) {
    const errors = error?.response?.errors || [];
    const mainError = errors[0] || null;
    const errorMessage = mainError?.message || "An error has occurred";

    // If the cart is already empty then lets just continue
    if (errorMessage === "Cart is empty") {
      res.send({ success: true, result });
      return;
    }

    res.send({ success: false, error: errorMessage });
    return;
  }
}

export default withSession(handler);
