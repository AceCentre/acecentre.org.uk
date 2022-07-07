import { gql } from "graphql-request";
import { request } from "../data-fetching";

import config from "../config";
import { getMediaNode } from "../utils/get-media-node";
import { parseHTML } from "linkedom";

const ENDPOINT = `${config.stellateUrl}`;

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
        categories {
          nodes {
            name
            slug
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

const GetFullProjects = gql`
  query getFullProjects {
    projects(first: 1000) {
      nodes {
        title
        slug
        content
        date
        excerpt
        categories {
          nodes {
            name
          }
        }
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

const GetLandingPageProjects = gql`
  query getLandingPageProjects {
    projects(first: 1000) {
      nodes {
        title
        slug
        extraMeta {
          featured
        }
        categories {
          nodes {
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

export const GetAllFullPosts = gql`
  query getAllFullPosts {
    posts(first: 1000) {
      nodes {
        title
        slug
        content
        date
        excerpt
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
      mainCategoryName: mainCategoryName(post),
      featuredImage: getFeaturedImage(post),
    };
  });
};

const mainCategoryName = (post) => {
  if (!post) return null;
  if (!post.categories) return null;
  if (!post.categories.nodes) return null;
  if (post.categories.nodes.length == 0) return null;

  return post.categories.nodes[0].name;
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
      content: post.content.replace(/loading="lazy"/g, ""),
      publishedDate: new Date(post.date).toString(),
      categories,
      description: getDescriptionFromExcerpt(post.excerpt),
      // Ooops
      mainCategoryName: mainCategoryName(post),
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

  return featuredNodes.map((project) => {
    return {
      slug: project.slug,
      title: project.title,
      mainCategoryName: getMainCategoryName(project),

      featuredImage: getFeaturedImage(project),
    };
  });
};

export const getAllProjects = async () => {
  const { projects } = await request(ENDPOINT, GetLandingPageProjects);
  const nodes = projects.nodes || [];

  return nodes.map((project) => {
    return {
      slug: project.slug,
      title: project.title,
      mainCategoryName: getMainCategoryName(project),
      featuredImage: getFeaturedImage(project),
    };
  });
};

export const getMainCategoryName = (project) => {
  if (!project) return "project";
  if (!project.categories) return "project";
  if (!project.categories.nodes) return "project";
  if (project.categories.nodes.length < 1) return "project";

  return project.categories.nodes[0].name;
};

export const getFullProjects = async () => {
  const { projects } = await request(ENDPOINT, GetFullProjects);
  const nodes = projects.nodes || [];

  return nodes.map((project) => {
    return {
      slug: project.slug,
      title: project.title,
      content: project.content,
      description: getDescriptionFromExcerpt(project.excerpt),
      mainCategoryName: getMainCategoryName(project),
      featuredImage: getFeaturedImage(project),
      publishedDate: new Date(project.date).toString(),
    };
  });
};

export const getDescriptionFromExcerpt = (excerpt) => {
  const { document: currentDocument } = parseHTML(excerpt);
  const firstPara = currentDocument.querySelector("p");

  return firstPara?.innerText || null;
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
      mainCategoryName: categoryName,
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

export const getFeaturedImage = (post) => {
  if (!post.featuredImage) return null;

  return getMediaNode(post.featuredImage.node);
};
