import { gql } from "graphql-request";
import { request } from "../data-fetching";

import config from "../config";
import { getMediaNode } from "../utils/get-media-node";

const ENDPOINT = `${config.baseUrl}/graphql`;

const GetAllCategories = gql`
  query getCategories {
    categories(first: 1000) {
      nodes {
        name
        slug
        categoryMeta {
          featuredimage {
            sourceUrl
            mediaDetails {
              width
              height
            }
            altText
          }
        }
      }
    }
  }
`;

// Full category list without ACF/meta — same `categories` connection as getCategories but lightweight.
// Avoids root `category(id:)` (can fail or error differently in production) and ensures GraphQL errors
// hit the `categories` branch in data-fetching.js (query name contains "Categories").
const GetCategoriesSlugLookup = gql`
  query getCategoriesSlugLookup {
    categories(first: 1000) {
      nodes {
        name
        slug
      }
    }
  }
`;

/** Resolve a blog category by URL slug when it may be missing from getAllCategories() (e.g. featured-image filter, Redis). */
export const getBlogCategoryBySlug = async (slug) => {
  if (!slug) return null;
  const normalized = String(slug).toLowerCase();
  try {
    const { categories } = await request(ENDPOINT, GetCategoriesSlugLookup);
    const nodes = categories?.nodes || [];
    const match = nodes.find((n) => n.slug?.toLowerCase() === normalized);
    if (!match?.slug) return null;
    return {
      slug: match.slug,
      title: match.name,
    };
  } catch (error) {
    console.error("GraphQL request failed for category slug lookup:", error);
    return null;
  }
};

export const getAllCategories = async () => {
  const { categories } = await request(ENDPOINT, GetAllCategories);
  const nodes = categories.nodes || [];

  return nodes
    .map((category) => {
      const featuredImage = getFeaturedImage(category);

      if (!featuredImage) {
        console.warn(
          `Missing featured image for blog category: ${category.name} (${category.slug})`,
        );
        return null;
      }

      return {
        slug: category.slug,
        title: category.name,
        featuredImage,
      };
    })
    .filter(Boolean);
};

const getFeaturedImage = (category) => {
  if (!category) return null;
  if (!category.categoryMeta) return null;

  // WordPress/GraphQL sometimes returns `sourceUrl` without `mediaDetails.width/height`.
  // For category banners we can still render the image with `layout="fill"`,
  // so allow missing dimensions here.
  return getMediaNode(category.categoryMeta.featuredimage, {
    allowMissingDimensions: true,
  });
};
