import withSession from "../../../lib/auth/with-session";
import { clientRequest } from "../../../lib/client-request";
import { EMPTY_CART } from "./update";

async function handler(req, res) {
  console.log("-------");
  console.log("Checkout began");

  let startTime = Date.now();
  let endTime = Date.now();
  console.log({ startTime, endTime });

  try {
    console.log("Started emptying cart");
    startTime = Date.now();
    await clientRequest(req, EMPTY_CART);
    endTime = Date.now();
    console.log("Emptied cart", endTime - startTime);
    console.log("-------");
  } catch (error) {
    const errors = error?.response?.errors || [];
    const mainError = errors[0] || null;
    const errorMessage = mainError?.message || "An error has occurred";

    console.log({ error, mainError, errorMessage });

    // If the cart is already empty then lets just continue
    if (errorMessage === "Cart is empty") {
      endTime = Date.now();
      console.log("Emptied cart, (with error)", endTime - startTime);
      res.send({ success: true });
      return;
    }

    console.log("-------");
    res.send({ success: false, error: errorMessage });
    return;
  }
}

export default withSession(handler);
