import withSession from "../../../lib/auth/with-session";
import { updateCustomer } from "../../../lib/cart/checkout";

async function handler(req, res) {
  console.log("-------");
  console.log("Checkout began");
  const body = JSON.parse(req.body);

  let startTime = Date.now();
  let endTime = Date.now();
  console.log({ startTime, endTime });

  try {
    startTime = Date.now();
    await updateCustomer(req, body);
    endTime = Date.now();
    console.log("Updated Customer", endTime - startTime);
    res.send({ success: true });
  } catch (error) {
    const errors = error?.response?.errors || [];
    const mainError = errors[0] || null;
    const errorMessage = mainError?.message || "An error has occurred";

    console.log({ error, mainError, errorMessage });

    console.log("-------");
    res.send({ success: false, error: errorMessage });
    return;
  }
}

export default withSession(handler);
