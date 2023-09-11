import { request as graphqlRequest, gql } from "graphql-request";

const fragments = gql`
  fragment resource on Resource {
    resourceUrl
    slug
    title
    authorUsername
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
  query LandingPage {
    languages {
      nodes {
        slug
        name
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

export const getLanguageLibraryLandingPageData = async () => {
  const networkResult = await graphqlRequest(endpoint, landingPageQuery);

  return networkResult;
};

export const getLandingPageSearchResultsProps = async () => {
  const networkResult = await graphqlRequest(endpoint, searchResultsPageQuery);

  return networkResult;
};
