import { request as graphqlRequest } from "graphql-request";

export const request = async (...allParams) => {
  return graphqlRequest(...allParams);
};
