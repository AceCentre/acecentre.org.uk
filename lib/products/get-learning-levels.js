import { gql } from "graphql-request";
import { request } from "../data-fetching";

import config from "../config";
import { getMediaNode } from "../utils/get-media-node";

const ENDPOINT = `${config.stellateUrl}`;

const GetAllLearningLevels = gql`
  query AllLearningLevels {
    learningLevels {
      nodes {
        name
        count
        description
        id

        slug
        aceLearningLevels {
          details {
            featuredImage {
              sourceUrl
              mediaDetails {
                width
                height
              }
              altText
            }
            fieldGroupName
            introText
            mainContent
          }
          fieldGroupName
          learningLevel
          summary {
            courseFocus
            fieldGroupName
            introText
            subheading
          }
        }
      }
    }
  }
`;

export const getLearningLevels = async () => {
  const queryResponse = await request(ENDPOINT, GetAllLearningLevels);
  const levels = queryResponse.learningLevels.nodes;

  return levels.map(nodeToLevel);
};

const nodeToLevel = (node) => {
  const level = {
    name: titleCase(node.slug),
    slug: node.slug,
    level: node.aceLearningLevels.learningLevel,
    featuredImage: getMediaNode(node.aceLearningLevels.details.featuredImage),
    intro: node.aceLearningLevels.details.introText,
    content: node.aceLearningLevels.details.mainContent,
    subheading: node.aceLearningLevels.summary.subheading,
    focus: node.aceLearningLevels.summary.courseFocus,
    alternativeIntro: node.aceLearningLevels.summary.introText,
  };

  return level;
};

const titleCase = (name) => {
  return name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
};
