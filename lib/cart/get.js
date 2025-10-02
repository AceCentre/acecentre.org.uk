import { clientRequest } from "../client-request";
import { gql } from "graphql-request";

// Full cart query - will gracefully handle cart_item loader errors
const GET_CART = gql`
  query GetCart {
    cart {
      total
      discountTotal
      subtotal
      shippingTotal
      totalTax
      contents {
        nodes {
          key
          quantity
          total
          subtotal
          product {
            node {
              databaseId
              name
              slug
              __typename
              ... on SimpleProduct {
                virtual
                downloadable
                soldIndividually
              }
              ... on VariableProduct {
                soldIndividually
              }
              ... on BundleProduct {
                bundled {
                  nodes {
                    slug
                  }
                }
              }
            }
          }
          variation {
            node {
              databaseId
              name
              virtual
              downloadable
            }
          }
        }
      }
    }
  }
`;

// Simplified query for when contents fails
const GET_CART_TOTALS = gql`
  query GetCartTotals {
    cart {
      total
      discountTotal
      subtotal
      shippingTotal
      totalTax
    }
  }
`;

// Main function
export async function getCart(req) {
  try {
    console.log("[getCart] Attempting full cart query with contents");

    const response = await clientRequest(req, GET_CART);
    const cart = response?.cart;

    if (!cart) {
      console.log("[getCart] No cart in response");
      return {
        lines: [],
        subtotal: "£0.00",
        vat: "£0.00",
        shipping: "£0.00",
        total: "£0.00",
        rawTotal: 0,
        discountTotal: "£0.00",
        needsDelivered: false,
      };
    }

    const rawLines = cart.contents?.nodes || [];
    console.log("[getCart] Cart has", rawLines.length, "items");

    let bundleSlugs = [];

    // Map cart items to frontend format
    let lines = rawLines
      .map((line) => {
        const product = line.product?.node;
        const variation = line.variation?.node;

        if (!product) {
          return null;
        }

        const isVirtual = variation?.virtual || product.virtual || false;
        const isDownloadable =
          variation?.downloadable || product.downloadable || false;
        const needsDelivered = !isVirtual && !isDownloadable;

        let type = "Resource";
        let resourceHref = `/resources/${product.slug}`;

        // Check for Moodle courses (Edwiser plugin fields removed)
        // const moodleCourses = product.moodleCourses?.nodes || [];
        // if (moodleCourses.length > 0) {
        //   type = "Course";
        //   resourceHref = `/learning/${product.slug}`;
        // }

        // Check for bundles
        let allowQuantityEditing = !product.soldIndividually;
        if (product.__typename === "BundleProduct") {
          type = "Bundle";
          allowQuantityEditing = false;
          if (product.bundled?.nodes) {
            bundleSlugs = [
              ...bundleSlugs,
              ...product.bundled.nodes.map((b) => b.slug),
            ];
          }
        }

        return {
          slug: product.slug,
          key: line.key,
          name: variation?.name || product.name,
          quantity: line.quantity,
          allowQuantityEditing,
          type,
          price: line.total,
          resourceHref,
          needsDelivered,
          groupPurchase: null, // courseGroupPurchase field removed (Edwiser plugin)
          lockQuantityEditing: false,
          productId: product.databaseId,
          variationId: variation?.databaseId || null,
        };
      })
      .filter(Boolean);

    // Lock quantities for bundled products
    lines.forEach((line) => {
      if (bundleSlugs.includes(line.slug)) {
        line.lockQuantityEditing = true;
      }
    });

    // Calculate delivery requirement
    const needsDelivered = lines.some((x) => x.needsDelivered);

    // Parse totals
    const rawTotal =
      parseFloat(cart.total?.replace(/[^0-9.-]/g, "") || "0") || 0;

    return {
      lines,
      subtotal: cart.subtotal || "£0.00",
      vat: cart.totalTax || "£0.00",
      shipping: cart.shippingTotal || "£0.00",
      total: cart.total || "£0.00",
      rawTotal,
      discountTotal: cart.discountTotal || "£0.00",
      needsDelivered,
    };
  } catch (err) {
    console.error("[getCart] Full query failed:", err);

    // Check if this is a cart_item loader error
    const errorList = err?.response?.errors || [];
    const hasCartItemLoaderError = errorList.some((e) =>
      e.message.includes("No loader assigned to the key cart_item")
    );

    if (hasCartItemLoaderError) {
      console.log(
        "[getCart] cart_item loader missing, falling back to totals-only query"
      );

      try {
        const response = await clientRequest(req, GET_CART_TOTALS);
        const cart = response?.cart;

        if (!cart) {
          throw new Error("No cart in totals response");
        }

        const rawTotal =
          parseFloat(cart.total?.replace(/[^0-9.-]/g, "") || "0") || 0;
        const rawShipping =
          parseFloat(cart.shippingTotal?.replace(/[^0-9.-]/g, "") || "0") || 0;

        console.log(
          "[getCart] Totals-only query succeeded. Total:",
          cart.total
        );

        // If cart has items (total > shipping cost), create a generic line item
        const hasItems = rawTotal > rawShipping;
        const lines = hasItems
          ? [
              {
                slug: "cart-item",
                key: "generic",
                name: "Items in cart (details unavailable)",
                quantity: 1,
                allowQuantityEditing: false,
                type: "Resource",
                price: cart.subtotal || "£0.00",
                resourceHref: "/resources",
                needsDelivered: false,
                groupPurchase: null,
                lockQuantityEditing: true,
              },
            ]
          : [];

        return {
          lines,
          subtotal: cart.subtotal || "£0.00",
          vat: cart.totalTax || "£0.00",
          shipping: cart.shippingTotal || "£0.00",
          total: cart.total || "£0.00",
          rawTotal,
          discountTotal: cart.discountTotal || "£0.00",
          needsDelivered: false,
        };
      } catch (fallbackErr) {
        console.error("[getCart] Fallback query also failed:", fallbackErr);
      }
    }

    // Return empty cart if all queries fail
    return {
      lines: [],
      subtotal: "£0.00",
      vat: "£0.00",
      shipping: "£0.00",
      total: "£0.00",
      rawTotal: 0,
      discountTotal: "£0.00",
      needsDelivered: false,
    };
  }
}
