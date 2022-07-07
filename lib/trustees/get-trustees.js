import { gql } from "graphql-request";
import { request } from "../data-fetching";

import { getMediaNode } from "../utils/get-media-node";
import config from "../config";

const ENDPOINT = `${config.stellateUrl}`;

const AllTrusteesQuery = gql`
  query MyQuery {
    trustees(first: 1000) {
      nodes {
        featuredImage {
          node {
            sourceUrl
            mediaDetails {
              width
              height
            }
          }
        }
        trusteeDetails {
          role
          quote
          dateJoined
          about
        }
        title
        slug
      }
    }
  }
`;

export const getAllTrustees = async () => {
  const queryResponse = await request(ENDPOINT, AllTrusteesQuery);

  return queryResponse.trustees.nodes.map((node) => {
    const trusteeDetails = getTrusteeDetails(node);

    return {
      name: node.title,
      slug: node.slug,
      image: getFeaturedImage(node),
      ...trusteeDetails,
    };
  });
};

const getFeaturedImage = (node) => {
  if (!node.featuredImage) return null;

  return getMediaNode(node.featuredImage.node);
};

const getTrusteeDetails = ({ trusteeDetails = {} }) => {
  if (!trusteeDetails)
    return { about: null, joined: null, quote: null, role: null };

  const about = trusteeDetails.about || null;
  const joined = trusteeDetails.dateJoined || null;
  const quote = trusteeDetails.quote || null;
  const role = trusteeDetails.role || null;

  return {
    about,
    joined,
    quote,
    role,
  };
};
