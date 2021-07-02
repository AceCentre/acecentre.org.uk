import { gql } from "graphql-request";
import { request } from "../data-fetching";

import config from "../config";
import { getMediaNode } from "../utils/get-media-node";

const ENDPOINT = `${config.baseUrl}/graphql`;

// Use this the featured story block
const SingleSimpleStoryQuery = gql`
  query GetStory($slug: ID!) {
    caseStudy(id: $slug, idType: SLUG) {
      extraMeta {
        storyName
        youtubeVideo
        quote
      }
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      excerpt
    }
  }
`;

const GetAllStories = gql`
  query GetStories {
    caseStudies(first: 1000) {
      nodes {
        title
        slug
        content
        extraMeta {
          storyName
          youtubeVideo
          quote
        }
        featuredImage {
          node {
            sourceUrl
            altText
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

export const getSimpleStory = async (slug) => {
  if (!slug) {
    return null;
  }

  const { caseStudy } = await request(ENDPOINT, SingleSimpleStoryQuery, {
    slug,
  });

  return nodeToSimpleStory(caseStudy, slug);
};

export const getAllStories = async () => {
  const { caseStudies } = await request(ENDPOINT, GetAllStories);

  if (!caseStudies) return [];
  if (!caseStudies.nodes) return [];

  const notNull = (x) => x != null;

  return caseStudies.nodes.map(nodeToStoryCard).filter(notNull);
};

const nodeToStoryCard = (node) => {
  if (!node.slug) return null;
  if (!node.title) return null;

  return {
    slug: node.slug,
    title: node.title,
    possessiveName: possessiveName(node.title),
    content: node.content,
    image: getImage(node.featuredImage),
    youtubeVideo: node.extraMeta.youtubeVideo || null,
    quote: node.extraMeta.quote || null,
  };
};

const getImage = (node) => {
  if (!node) return null;
  if (!node.node) return null;

  return getMediaNode(node.node);
};

const possessiveName = (name) => {
  const lastLetter = name[name.length - 1];

  if (lastLetter === "s") return `${name}'`;
  return `${name}'s`;
};

const nodeToSimpleStory = (node, slug) => {
  if (!node) return null;
  if (!node.excerpt) return null;
  if (!node.extraMeta) return null;
  if (!node.extraMeta.storyName) return null;

  return {
    summary: node.excerpt.trim(),
    youtubeVideo: node.extraMeta.youtubeVideo || null,
    title: node.extraMeta.storyName,
    slug,
    featuredImage: getImage(node.featuredImage),
    quote: node.extraMeta.quote || null,
  };
};
