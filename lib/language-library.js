import { request as graphqlRequest, gql } from "graphql-request";

const fragments = gql`
  fragment resource on Resource {
    resourceUrl
    databaseId
    slug
    title
    authorUsername
    formats {
      nodes {
        name
        slug
        description
      }
    }
    translationMethods {
      nodes {
        name
        description
      }
    }
    resourceFiles {
      nodes {
        id
        databaseId
        mediaItemUrl
      }
    }
    resourceType
    format
    description
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    slug
    languages {
      nodes {
        name
        slug
      }
    }
    translationMethods {
      nodes {
        name
        slug
      }
    }
  }
`;

const getAllResources = gql`
  ${fragments}

  query GetAllResources {
    resources(first: 9999) {
      nodes {
        ...resource
      }
    }
  }
`;

const getResourceBySlug = gql`
  ${fragments}

  query GetResourceBySlug($slug: ID!) {
    resource(id: $slug, idType: SLUG) {
      ...resource
      languages {
        nodes {
          slug
          resources(first: 9999) {
            nodes {
              slug
              title
              authorUsername
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;

const landingPageQuery = gql`
  ${fragments}

  query LandingPage {
    resources(first: 9999) {
      nodes {
        languages {
          nodes {
            slug
            name
          }
        }
      }
    }

    displayTag(id: "featured", idType: SLUG) {
      resources(first: 9999) {
        nodes {
          ...resource
        }
      }
    }
  }
`;

const searchResultsPageQuery = gql`
  ${fragments}

  query GetAllResources {
    resources(first: 9999) {
      nodes {
        ...resource
      }
    }
  }
`;

const getAllSlugsQuery = gql`
  query GetAllSlugsQuery {
    resources(first: 9999) {
      nodes {
        slug
      }
    }
  }
`;

const endpoint = "https://language-library.acecentre.org.uk/graphql";

export const getLanguageLibraryResources = async () => {
  const networkResult = await graphqlRequest(endpoint, getAllResources);

  return networkResult.resources.nodes;
};

export const getLanguageLibraryResource = async (slug) => {
  const networkResult = await graphqlRequest(endpoint, getResourceBySlug, {
    slug,
  });

  // Sort english last. Its unlikely English is going to be the language we want to focus on.
  let sortedLanguages = networkResult.resource.languages.nodes.sort((a, b) => {
    if (a.slug === "english" && b.slug !== "english") return 1;
    if (b.slug === "english" && a.slug !== "english") return -1;
    return 0;
  });

  let relevantResources = arrayUniqueByKey(
    sortedLanguages.map((x) => x.resources.nodes).flat(),
    "slug"
  ).slice(0, 4);

  return { ...networkResult.resource, relevantResources };
};

const arrayUniqueByKey = (array, key) => [
  ...new Map(array.map((item) => [item[key], item])).values(),
];

export const getLanguageLibraryLandingPageData = async () => {
  const networkResult = await graphqlRequest(endpoint, landingPageQuery);

  const allLanguages = networkResult.resources.nodes
    .map((x) => x.languages.nodes)
    .flat();

  return {
    ...networkResult,
    languages: { nodes: arrayUniqueByKey(allLanguages, "slug") },
  };
};

export const getLanguageLibrarySearchResultsProps = async () => {
  const networkResult = await graphqlRequest(endpoint, searchResultsPageQuery);

  return networkResult;
};

export const getAllSlugs = async () => {
  const networkResult = await graphqlRequest(endpoint, getAllSlugsQuery);

  return networkResult;
};
