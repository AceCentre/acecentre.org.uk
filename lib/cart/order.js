import { gql } from "graphql-request";
import { clientRequest } from "../client-request";
import { isMoodleProduct } from "../products/get-products";

const GetOrder = gql`
  query GetOrder($id: ID!) {
    order(id: $id, idType: DATABASE_ID) {
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
`;

export const getOrder = async (req, orderId) => {
  const { order } = await clientRequest(req, GetOrder, {
    id: orderId,
  });

  if (!order) return { status: "Failed" };

  const stripeChargeCaptured =
    order.metaData.find((meta) => meta.key === "_stripe_charge_captured")
      ?.value || "no";

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

  return {
    id: order.databaseId,
    status: toTitleCase(order.status),
    date: order.date,
    cost: order.total === "£0.00" ? "Free" : order.total,
    lines,
    stripeFinishedCharging: stripeChargeCaptured === "yes",
  };
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
