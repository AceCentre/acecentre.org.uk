import { gql } from "graphql-request";
import { clientRequest } from "../client-request";
import { getProductFromNode } from "../products/get-products";

const GET_CART = gql`
  query GetCart {
    cart {
      contents {
        nodes {
          product {
            node {
              slug
              name

              image {
                altText
                mediaDetails {
                  width
                  height
                }
                sourceUrl
              }

              galleryImages {
                nodes {
                  altText
                  mediaDetails {
                    width
                    height
                  }
                  sourceUrl
                }
              }

              ... on SimpleProduct {
                price(format: RAW)

                downloadable
                stockStatus
                stockQuantity
                databaseId
              }

              ... on ExternalProduct {
                price(format: RAW)
                databaseId
              }

              ... on VariableProduct {
                databaseId
                variations {
                  nodes {
                    name
                    id
                    price(format: RAW)

                    downloadable
                    stockStatus
                    stockQuantity
                    databaseId
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getCart(req) {
  const response = await clientRequest(req, GET_CART);
  const products = response.cart.contents.nodes.map((node) =>
    getProductFromNode(node.product.node)
  );

  return products;
}
