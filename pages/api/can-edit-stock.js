// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSession from "../../lib/auth/with-session";
import { clientRequest } from "../../lib/client-request";

import { gql } from "graphql-request";

const GetCapabilities = gql`
  query GetCapabilities($id: ID!, $productSlug: ID!) {
    user(id: $id) {
      capabilities
    }

    product(id: $productSlug, idType: SLUG) {
      ... on SimpleProduct {
        stockQuantity
        stockStatus
        manageStock
      }
    }
  }
`;

const handler = async (req, res) => {
  if (!req.query.course) return res.send({ canEditStock: false });

  const user = req.session.get("user");

  if (!user || !user.authToken) {
    return res.send({ canEditStock: false });
  }

  try {
    const response = await clientRequest(req, GetCapabilities, {
      id: user.userId,
      productSlug: req.query.course,
    });

    if (
      response &&
      response.user &&
      response.user.capabilities &&
      response.user.capabilities.includes("manage_woocommerce") &&
      response.product &&
      response.product.manageStock === true &&
      response.product.stockStatus === "IN_STOCK" &&
      response.product.stockQuantity
    ) {
      return res.send({
        canEditStock: true,
        stockQuantity: response.product.stockQuantity,
      });
    }

    return res.send({ canEditStock: false });
  } catch (error) {
    console.log(error);
    return res.send({ canEditStock: false });
  }
};

export default withSession(handler);
