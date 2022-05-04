import { gql } from "graphql-request";
import config from "./config";
import { request } from "./data-fetching";

const ENDPOINT = config.launchpadUrl;

const GetTemplates = gql`
  query getTemplates {
    templates {
      templateId
      templateName
      templateDescription
      templateImageUrl
      templateVariables {
        ... on TemplateVariable {
          id
          description
          type
        }

        ... on OptionTemplateVariable {
          options {
            value
            label
            description
          }
        }

        ... on FreeTextTemplateVariable {
          maxLength
        }

        ... on NumberTemplateVariable {
          min
          max
        }
      }
    }
  }
`;

export const getTemplates = async () => {
  const { templates } = await request(ENDPOINT, GetTemplates);

  return templates;
};
