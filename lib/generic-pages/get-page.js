import { gql } from "graphql-request";
import { request } from "../data-fetching";
import config from "../config";

const ENDPOINT = `${config.baseUrl}/graphql`;

const GET_PAGE = gql`
  query GetPage($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      content
    }
  }
`;

export const getPage = async (slug) => {
  const queryResponse = await request(ENDPOINT, GET_PAGE, { slug });

  const content = queryResponse.page.content
    .replaceAll("<p><strong> </strong></p>", "")
    .replaceAll("<p><strong><em> </em></strong></p>", "")
    .replaceAll("<p><em> </em></p>", "")
    .replaceAll("<p><em><br />\n</em></p>", "")
    .replaceAll("<p>&nbsp;</p>", "")
    .replaceAll("<p><strong><br />\n</strong></p>", "");

  console.log(content);

  return {
    title: queryResponse.page.title,
    content,
  };
};
