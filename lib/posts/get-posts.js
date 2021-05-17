import { request, gql } from "graphql-request";
import config from "../config";
import { getMediaNode } from "../utils/get-media-node";

const ENDPOINT = `${config.baseUrl}/graphql`;

// Get the first 3 posts in General
const GetLandingPagePosts = gql`
  query getLandingPagePosts {
    posts(first: 3, where: { categoryName: "General" }) {
      nodes {
        title
        slug
        featuredImage {
          node {
            sourceUrl
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

const GetAllPostsForCategory = gql`
  query getAllPostsForCategory($categoryName: String!) {
    posts(first: 1000, where: { categoryName: $categoryName }) {
      nodes {
        title
        slug
        featuredImage {
          node {
            sourceUrl
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

const GetAllPostCards = gql`
  query getLandingPagePosts {
    posts(first: 1000) {
      nodes {
        title
        slug
        featuredImage {
          node {
            sourceUrl
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

const GetLandingPageProjects = gql`
  query getLandingPageProjects {
    projects(first: 100) {
      nodes {
        title
        slug
        extraMeta {
          featured
        }
        featuredImage {
          node {
            sourceUrl
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

export const GetAllFullPosts = gql`
  query getAllFullPosts {
    posts(first: 1000) {
      nodes {
        title
        slug
        content
        date
        categories {
          nodes {
            slug
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
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

export const getAllPostCards = async () => {
  const { posts } = await request(ENDPOINT, GetAllPostCards);
  const nodes = posts.nodes || [];

  return nodes.map((post) => {
    return {
      slug: post.slug,
      title: post.title,
      featuredImage: getFeaturedImage(post),
    };
  });
};

export const getAllFullPosts = async () => {
  const { posts } = await request(ENDPOINT, GetAllFullPosts);
  const nodes = posts.nodes || [];

  return nodes.map((post) => {
    const categories = getCategories(post);

    return {
      slug: post.slug,
      title: post.title,
      featuredImage: getFeaturedImage(post),
      content: post.content,
      publishedDate: new Date(post.date),
      categories,
      featuredCategoryName: getFeaturedCategoryName(categories),
      featuredCategorySlug: getFeaturedCategorySlug(categories),
    };
  });
};

const getFeaturedCategorySlug = (categories) => {
  if (!categories) return null;
  if (categories.length === 0) return null;
  if (!categories[0].slug) return null;

  return categories[0].slug;
};

const getFeaturedCategoryName = (categories) => {
  if (!categories) return null;
  if (categories.length === 0) return null;
  if (!categories[0].name) return null;

  return categories[0].name;
};

const getCategories = (post) => {
  if (!post) return [];
  if (!post.categories) return [];
  if (!post.categories.nodes) return [];

  return post.categories.nodes;
};

export const getLandingPageProjects = async () => {
  const { projects } = await request(ENDPOINT, GetLandingPageProjects);
  const nodes = projects.nodes || [];
  const featuredNodes = nodes.filter((node) => !!node.extraMeta.featured);

  if (featuredNodes.length < 3) return null;

  return featuredNodes.slice(0, 3).map((project) => {
    return {
      slug: project.slug,
      title: project.title,
      featuredImage: getFeaturedImage(project),
    };
  });
};

export const getAllPostsForCategory = async (categoryName) => {
  if (!categoryName) throw new Error("No category specified");

  const { posts } = await request(ENDPOINT, GetAllPostsForCategory, {
    categoryName,
  });
  const nodes = posts.nodes || [];

  return nodes.map((project) => {
    return {
      slug: project.slug,
      title: project.title,
      featuredImage: getFeaturedImage(project),
    };
  });
};

export const getLandingPagePosts = async () => {
  const { posts } = await request(ENDPOINT, GetLandingPagePosts);
  const nodes = posts.nodes || [];

  if (nodes.length < 3) return null;

  return nodes.map((post) => {
    return {
      slug: post.slug,
      title: post.title,
      featuredImage: getFeaturedImage(post),
    };
  });
};

const getFeaturedImage = (post) => {
  if (!post.featuredImage) return null;

  return getMediaNode(post.featuredImage.node);
};
