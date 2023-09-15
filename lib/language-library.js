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
    resources {
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
    }
  }
`;

const landingPageQuery = gql`
  ${fragments}

  query LandingPage {
    resources {
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
      resources {
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
    resources {
      nodes {
        ...resource
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

  return networkResult.resource;
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
