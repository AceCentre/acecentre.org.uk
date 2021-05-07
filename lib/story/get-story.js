import { request, gql } from "graphql-request";
import config from "../config";

const ENDPOINT = `${config.baseUrl}/graphql`;

// Use this the featured story block
const SingleSimpleStoryQuery = gql`
  query GetStory($slug: ID!) {
    caseStudy(id: $slug, idType: SLUG) {
      extraMeta {
        storyName
        youtubeVideo
      }
      excerpt
    }
  }
`;

export const getSimpleStory = async (slug) => {
  if (!slug) {
    return null;
  }

  const { caseStudy } = await request(ENDPOINT, SingleSimpleStoryQuery, {
    slug,
  });

  return nodeToSimpleStory(caseStudy, slug);
};

const nodeToSimpleStory = (node, slug) => {
  if (!node) return null;
  if (!node.excerpt) return null;
  if (!node.extraMeta) return null;
  if (!node.extraMeta.youtubeVideo) return null;
  if (!node.extraMeta.storyName) return null;

  return {
    summary: node.excerpt.trim(),
    youtubeVideo: node.extraMeta.youtubeVideo,
    title: node.extraMeta.storyName,
    slug,
  };
};
