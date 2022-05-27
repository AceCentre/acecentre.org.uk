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
      templateVariableGroups {
        id
        variables
        name
        description
        openByDefault
      }
      templateVariables {
        ... on TemplateVariable {
          id
          description
          type
          name
          defaultValue
          hidden
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

        ... on PresetTemplateVariable {
          presets {
            value
            label
            variableValues {
              id
              value
            }
          }
        }

        ... on BooleanTemplateVariable {
          trueLabel
          falseLabel
        }
      }
    }
  }
`;

export const getTemplates = async () => {
  const { templates } = await request(ENDPOINT, GetTemplates);

  return templates;
};
