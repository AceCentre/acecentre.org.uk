import { gql } from "graphql-request";
import { request } from "../data-fetching";

import config from "../config";
import { getMediaNode } from "../utils/get-media-node";

const ENDPOINT = `${config.stellateUrl}`;

const GetAllCategories = gql`
  query getCategories {
    categories(first: 1000) {
      nodes {
        name
        slug
        categoryMeta {
          featuredimage {
            sourceUrl
            mediaDetails {
              width
              height
            }
            altText
          }
        }
      }
    }
  }
`;

export const getAllCategories = async () => {
  const { categories } = await request(ENDPOINT, GetAllCategories);
  const nodes = categories.nodes || [];

  return nodes.map((category) => {
    const featuredImage = getFeaturedImage(category);

    if (!featuredImage)
      throw new Error(
        `You need a featured image for a blog category: ${category.name}`
      );

    return {
      slug: category.slug,
      title: category.name,
      featuredImage,
    };
  });
};

const getFeaturedImage = (category) => {
  if (!category) return null;
  if (!category.categoryMeta) return null;

  return getMediaNode(category.categoryMeta.featuredimage);
};
