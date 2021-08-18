import { clientRequest } from "../client-request";
import { gql } from "graphql-request";
import { isMoodleProduct } from "../products/get-products";

const CHECKOUT = gql`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      order {
        databaseId
        createdVia
        currency
        date
        status
        total
        subtotal
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

export async function updateCustomer(req, body) {
  const input = bodyToInput(body);
  await clientRequest(req, UPDATE_CUSTOMER, {
    billing: input.billing,
  });
}

export async function checkout(req, body) {
  const input = bodyToInput(body);

  const response = await clientRequest(req, CHECKOUT, {
    input,
  });

  const order = response.checkout.order;

  const lines = order.lineItems.nodes.map((line) => {
    const moodleProduct = isMoodleProduct(line.product);
    return {
      name: line.product.name,
      quantity: line.quantity,
      total: line.total == null ? "Free" : `£${line.total}`,
      type: moodleProduct ? "Course" : "Resource",
      href: `/${moodleProduct ? "learning" : "resources"}/${line.product.slug}`,
    };
  });

  const formattedOrder = {
    id: order.databaseId,
    status: toTitleCase(order.status),
    date: order.date,
    cost: order.total === "£0.00" ? "Free" : order.total,
    lines,
  };

  return { order: formattedOrder };
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
