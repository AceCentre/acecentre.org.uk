import { request, gql } from "graphql-request";
import config from "../config";

const ENDPOINT = `${config.baseUrl}/graphql`;

const GetAllCategories = gql`
  query getCategories {
    categories(first: 1000) {
      nodes {
        name
        slug
      }
    }
  }
`;

export const getAllCategories = async () => {
  const { categories } = await request(ENDPOINT, GetAllCategories);
  const nodes = categories.nodes || [];

  return nodes.map((category) => {
    return {
      slug: category.slug,
      title: category.name,
    };
  });
};
