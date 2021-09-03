import { gql } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import { clientRequest } from "../../../lib/client-request";

const APPLY_COUPON = gql`
  mutation applyCoupon($currentCoupon: String!) {
    applyCoupon(input: { code: $currentCoupon }) {
      applied {
        discountAmount
      }
    }
  }
`;

async function handler(req, res) {
  const body = JSON.parse(req.body);
  const currentCoupon = body.currentCoupon || "";

  try {
    await clientRequest(req, APPLY_COUPON, {
      currentCoupon: currentCoupon.toLowerCase(),
    });
  } catch (error) {
    const errors = error?.response?.errors || [];
    const mainError = errors[0] || null;
    const errorMessage = mainError?.message || "An error has occurred";

    res.send({ success: false, error: errorMessage });
    return;
  }

  res.send({ success: true });
}

export default withSession(handler);
