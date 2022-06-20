import withSession from "../../../lib/auth/with-session";
import { addToMailingList } from "../auth/register";

async function handler(req, res) {
  const body = JSON.parse(req.body);

  let startTime = Date.now();
  let endTime = Date.now();
  console.log({ startTime, endTime });
  try {
    startTime = Date.now();
    await addToMailingList(body.email);
    endTime = Date.now();
    console.log("Added to the mailing list", endTime - startTime);
    res.send({ success: true });
  } catch (error) {
    const errors = error?.response?.errors || [];
    const mainError = errors[0] || null;
    const errorMessage = mainError?.message || "An error has occurred";

    console.log({ error, mainError, errorMessage });

    // If the cart is already empty then lets just continue
    console.log("-------");
    res.send({ success: false, error: errorMessage });
    return;
  }
}

export default withSession(handler);
