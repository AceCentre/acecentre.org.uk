import { request, gql } from "graphql-request";
import config from "../config";
import { getMediaNode } from "../utils/get-media-node";

const ENDPOINT = `${config.baseUrl}/graphql`;

// Get the first 3 posts in General
const GetLandingPagePosts = gql`
  query getLandingPagePosts {
    posts(first: 3, where: { categoryName: "General" }) {
      nodes {
        title
        slug
        featuredImage {
          node {
            sourceUrl
            mediaDetails {
              width
              height
            }
          }
        }
      }
    }
  }
`;

export const getLandingPagePosts = async () => {
  const { posts } = await request(ENDPOINT, GetLandingPagePosts);
  const nodes = posts.nodes || [];

  if (nodes.length < 3) return null;

  return nodes.map((post) => {
    return {
      slug: post.slug,
      title: post.title,
      featuredImage: getMediaNode(post.featuredImage.node),
    };
  });
};
