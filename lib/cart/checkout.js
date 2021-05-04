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

export const bodyToInput = (body) => {
  if (!body) throw new Error("You have not provided a body");
  if (!body.billingDetails) throw new Error("No billingDetails provided");

  const billingDetails = body.billingDetails;

  if (!billingDetails.firstName) throw new Error("No firstName provided");
  if (!billingDetails.lastName) throw new Error("No lastName provided");
  if (!billingDetails.address1) throw new Error("No address1 provided");
  if (!billingDetails.city) throw new Error("No city provided");
  if (!billingDetails.postcode) throw new Error("No postcode provided");
  if (!billingDetails.phoneNo) throw new Error("No phoneNo provided");
  if (!billingDetails.email) throw new Error("No email provided");
  if (!billingDetails.stripeSourceId)
    throw new Error("No stripeSourceId provided");
  if (billingDetails.country !== "GB")
    throw new Error("We currently only support GB");

  let optionalBillingDetails = {};

  if (billingDetails.company) {
    optionalBillingDetails["company"] = billingDetails.company;
  }

  if (billingDetails.county) {
    optionalBillingDetails["county"] = billingDetails.county;
  }

  let optionalAccountCreation = {};

  if (body.password) {
    optionalAccountCreation["account"] = {
      password: body.password,
      username: billingDetails.email,
    };
  }

  let optionalShippingDetails = {};

  if (body.shippingDetails) {
    const shippingDetails = body.shippingDetails;

    if (!shippingDetails.firstName) throw new Error("No firstName provided");
    if (!shippingDetails.lastName) throw new Error("No lastName provided");
    if (!shippingDetails.address1) throw new Error("No address1 provided");
    if (!shippingDetails.city) throw new Error("No city provided");
    if (!shippingDetails.postcode) throw new Error("No postcode provided");
    if (shippingDetails.country !== "GB")
      throw new Error("We currently only support GB");

    optionalShippingDetails = {
      shipToDifferentAddress: true,
      shipping: {
        firstName: shippingDetails.firstName,
        lastName: shippingDetails.lastName,
        address1: shippingDetails.address1,
        city: shippingDetails.city,
        postcode: shippingDetails.postcode,
        country: shippingDetails.country,
      },
    };

    if (shippingDetails.county) {
      optionalShippingDetails.shipping.county = shippingDetails.county;
    }

    if (shippingDetails.note) {
      optionalShippingDetails.customerNote = shippingDetails.note;
    }
  }

  return {
    paymentMethod: "stripe",
    shippingMethod: "Flat rate",

    ...optionalShippingDetails,

    ...optionalAccountCreation,

    billing: {
      firstName: billingDetails.firstName,
      lastName: billingDetails.lastName,
      address1: billingDetails.address1,
      city: billingDetails.city,
      postcode: billingDetails.postcode,
      phone: billingDetails.phoneNo,
      email: billingDetails.email,
      country: billingDetails.country,

      ...optionalBillingDetails,
    },
    metaData: [
      {
        key: "_stripe_source_id",
        value: billingDetails.stripeSourceId,
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
