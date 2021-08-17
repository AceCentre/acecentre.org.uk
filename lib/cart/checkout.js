import { clientRequest } from "../client-request";
import { gql } from "graphql-request";

const CHECKOUT = gql`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      order {
        databaseId
        id
        customer {
          id
          databaseId
        }
      }
    }
  }
`;

export const bodyToInput = (body) => {
  return {
    billing: body.billingDetails,
    customerNote: body.orderNotesDelivery,
    isPaid: true,
    paymentMethod: "stripe",
    shipToDifferentAddress: body.shipToDifferentAddress,
    ...(body.shipToDifferentAddress ? { shipping: body.shippingDetails } : {}),
    shippingMethod: "Flat rate",
    metaData: [
      {
        key: "_stripe_source_id",
        value: body.source.id,
      },
    ],
  };
};

export async function checkout(req, body) {
  const input = bodyToInput(body);

  const response = await clientRequest(req, CHECKOUT, {
    input,
  });

  return response;
}
