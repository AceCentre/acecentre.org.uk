import { gql } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import { clientRequest } from "../../../lib/client-request";
import { withSentry } from "@sentry/nextjs";

const UPDATE_BILLING = gql`
  mutation UpdateBilling($input: CustomerAddressInput!, $customerId: ID!) {
    updateCustomer(input: { billing: $input, id: $customerId }) {
      customer {
        id
      }
    }
  }
`;

const UPDATE_SHIPPING = gql`
  mutation UpdateShipping($input: CustomerAddressInput!, $customerId: ID!) {
    updateCustomer(input: { shipping: $input, id: $customerId }) {
      customer {
        id
      }
    }
  }
`;

async function handler(req, res) {
  const body = JSON.parse(req.body);
  const addressType = body.addressType;
  const user = req.session.get("user");

  if (addressType === "billing") {
    await clientRequest(req, UPDATE_BILLING, {
      input: { ...body.address, overwrite: true },
      customerId: user.customerId,
    });

    res.send({
      success: true,
    });
  } else if (addressType === "shipping") {
    await clientRequest(req, UPDATE_SHIPPING, {
      input: { ...body.address, overwrite: true },
      customerId: user.customerId,
    });
    res.send({
      success: true,
    });
  } else {
    res.send({
      success: false,
    });
  }
}

export default withSentry(withSession(handler));
