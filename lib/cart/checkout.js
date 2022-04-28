import { clientRequest } from "../client-request";
import { gql } from "graphql-request";
import { isMoodleProduct } from "../products/get-products";

const CHECKOUT = gql`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      redirect
      result
      paymentIntentSecret
      order {
        databaseId
        createdVia
        currency
        date
        status
        total
        subtotal
        metaData {
          key
          value
          id
        }
        needsPayment

        paymentMethod

        lineItems {
          nodes {
            product {
              id
              name
              slug
              moodleCourses {
                nodes {
                  id
                }
              }
            }
            quantity
            total
          }
        }
      }
    }
  }
`;

const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($billing: CustomerAddressInput!) {
    updateCustomer(input: { billing: $billing }) {
      customer {
        billing {
          email
          firstName
          lastName
          address1
          city
          country
        }
      }
    }
  }
`;

export const bodyToInput = (body, cohortNames) => {
  const sourceId = body.source.id;

  return {
    ...(cohortNames ? { cohortNames } : {}),

    billing: body.billingDetails,
    customerNote: body.orderNotesDelivery,
    isPaid: false,
    paymentMethod: "stripe",
    shipToDifferentAddress: body.shipToDifferentAddress,
    ...(body.shipToDifferentAddress ? { shipping: body.shippingDetails } : {}),
    shippingMethod: "Flat rate",

    // ESlint and prettier are fighting over this block
    /* eslint-disable indent */
    // Only attach the metadata if we have a source
    ...(sourceId
      ? {
          metaData: [
            {
              key: "_stripe_source_id",
              value: sourceId,
            },
          ],
        }
      : {}),
    /* eslint-enable indent */
  };
};

export async function updateCustomer(req, body) {
  const input = bodyToInput(body);
  await clientRequest(req, UPDATE_CUSTOMER, {
    billing: input.billing,
  });
}

export async function checkout(req, body, cohortNames) {
  const input = bodyToInput(body, cohortNames);

  const response = await clientRequest(req, CHECKOUT, {
    input,
  });

  console.log(JSON.stringify({ input, response: response.checkout }, null, 2));

  const order = response.checkout.order;

  const lines = order.lineItems.nodes.map((line) => {
    const moodleProduct = isMoodleProduct(line.product);

    return {
      name: line?.product?.name || "Temporary name",
      quantity: line.quantity,
      total: line.total == null ? "Free" : `£${line.total}`,
      type: moodleProduct ? "Course" : "Resource",
      href: `/${moodleProduct ? "learning" : "resources"}/${
        line.product?.slug || "temp-slug"
      }`,
    };
  });

  const stripeChargeCaptured =
    order.metaData.find((meta) => meta.key === "_stripe_charge_captured")
      ?.value || "no";

  const formattedOrder = {
    id: order.databaseId,
    status: toTitleCase(order.status),
    date: order.date,
    cost: order.total === "£0.00" ? "Free" : order.total,
    lines,
    stripeFinishedCharging:
      stripeChargeCaptured === "yes" ||
      response.checkout.paymentIntentSecret === null,
    paymentIntent: response.checkout.paymentIntentSecret,
  };

  return {
    order: formattedOrder,
  };
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
