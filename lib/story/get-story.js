import { gql } from "graphql-request";
import { request } from "../data-fetching";

import config from "../config";
import { getMediaNode } from "../utils/get-media-node";

import { parseHTML } from "linkedom";
import { Replaceable } from "../generic-pages/get-page";

const ENDPOINT = `${config.stellateUrl}`;

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
      title
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
        excerpt
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

  // Remove the embeded video from the HTML
  const { document: currentDocument } = parseHTML(
    `<div id="wrapperNode">${node.content}<div>`
  );
  const videoNode = currentDocument.querySelector(".responsive-embed");
  const images = currentDocument.querySelectorAll("img");
  images.forEach((image) => {
    image.remove();
  });
  const figures = currentDocument.querySelectorAll("figure");
  figures.forEach((figure) => {
    figure.remove();
  });
  if (videoNode) {
    videoNode.remove();
  }
  const fullContent = currentDocument.getElementById("wrapperNode").innerHTML;
  const content = new Replaceable(fullContent)
    .replaceAll("<p>&nbsp;</p>", "")
    .toString();

  return {
    slug: node.slug,
    title: node.title,
    possessiveName: possessiveName(node.title),
    content,
    image: getImage(node.featuredImage),
    youtubeVideo: node.extraMeta.youtubeVideo || null,
    quote: node.extraMeta.quote || null,
    shortDescription: node.excerpt.replace(/(<([^>]+)>)/gi, ""),
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
    shortTitle: node.title,
    slug,
    featuredImage: getImage(node.featuredImage),
    quote: node.extraMeta.quote || null,
  };
};
