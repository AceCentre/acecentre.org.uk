import { clientRequest } from "../client-request";
import { gql } from "graphql-request";

const CHECKOUT = gql`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      order {
        databaseId
      }
    }
  }
`;

export async function checkout(req, { stripeSourceId }) {
  const response = await clientRequest(req, CHECKOUT, {
    input: {
      clientMutationId: "12345",
      paymentMethod: "stripe", // <-- Hey WooCommerce, we'll be using Stripe
      shippingMethod: "Flat rate",
      billing: {
        // <-- Hard-coding this for simplicity
        firstName: "George",
        lastName: "Costanza",
        address1: "129 West 81st Street, Apartment 5A",
        city: "New York",
        state: "NY",
        postcode: "12345",
        email: "george@vandelayindustries.com",
        country: "GB",
      },
      metaData: [
        {
          key: "_stripe_source_id",
          value: stripeSourceId,
        },
      ],
    },
  });

  return response;
}
