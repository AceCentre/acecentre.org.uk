import { gql, request as graphqlRequest } from "graphql-request";
import config from "./config";

const ENDPOINT = config.launchpadUrl;

const GetTemplates = gql`
  query getTemplates {
    templates {
      templateShortDescription
      templateId
      templateName
      templateDescription
      templateDateCreated
      templateImageUrl
      templateCategory
      templateSubcategory
      templateFeatured
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

const GetCategories = gql`
  query getTemplates {
    templates {
      templateId

      templateCategory
      templateSubcategory
    }
  }
`;

export const getLaunchpadProducts = async () => {
  const { templates } = await graphqlRequest(ENDPOINT, GetTemplates);

  const products = templates.map(templateToProduct);

  return products;
};

const templateToProduct = (template, index) => {
  return {
    id: index + 1,
    slug: template.templateId,
    date: template.templateDateCreated,
    name: template.templateName,
    description: template.templateDescription,
    shortDescription: template.templateShortDescription,
    attachedResources: [],
    featured: template.templateFeatured,
    totalSales: 99999, // These will always be shown as popular
    price: 0, // We will never charge for these
    variations: [], // Variations doesn't make sense for templates
    gallery: [], // We wont use this
    inStock: true, // They will always be in stock
    category: { name: template.templateCategory }, // Move this into the template storage
    projects: [], // We wont use this
    ebook: null, // We wont use this
    instantDownloadAvailable: true, // This adds the download banner
    image: {
      src: template.templateImageUrl,
      alt: `An example of ${template.templateName}`,
    },
    isLaunchpadTemplate: true, // Use different components when this is true
  };
};

export const getLaunchpadCategories = async () => {
  const { templates } = await graphqlRequest(ENDPOINT, GetCategories);

  return templates.map((template) => {
    return {
      ...template,
      templateCategorySlug: slugify(template.templateCategory),
      templateSubcategorySlug: slugify(template.templateSubcategory),
    };
  });
};

const slugify = (str) => {
  return str.split(" ").join("-").toLowerCase();
};

export const getTemplates = async () => {
  const { templates } = await graphqlRequest(ENDPOINT, GetTemplates);

  return templates;
};

export const getLaunchpadTemplate = async (slug) => {
  const templates = await getTemplates();

  const template = templates.find((x) => slug.includes(x.templateId));

  return template;
};
