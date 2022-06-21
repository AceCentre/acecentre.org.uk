import { gql } from "graphql-request";
import { request } from "../data-fetching";
import config from "../config";

const ENDPOINT = `${config.baseUrl}/graphql`;

const GET_PAGE = gql`
  query GetPage($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      content
      communicationWorks {
        northSeminarAgenda {
          link
        }
        southSeminarAgenda {
          link
        }
      }
    }
  }
`;

export const getPage = async (slug) => {
  const queryResponse = await request(ENDPOINT, GET_PAGE, { slug });

  if (!queryResponse.page || !queryResponse.page.content) {
    return false;
  }

  const content = new Replaceable(queryResponse.page.content)
    .replaceAll("<p><strong> </strong></p>", "")
    .replaceAll("<p><strong><em> </em></strong></p>", "")
    .replaceAll("<p><em> </em></p>", "")
    .replaceAll("<p><em><br />\n</em></p>", "")
    .replaceAll("<p>&nbsp;</p>", "")
    .replaceAll("<p><strong><br />\n</strong></p>", "")
    .toString();

  let communicationWorksUrl = null;
  let communicationWorksSouthUrl = null;

  if (
    queryResponse &&
    queryResponse.page &&
    queryResponse.page.communicationWorks &&
    queryResponse.page.communicationWorks.northSeminarAgenda &&
    queryResponse.page.communicationWorks.northSeminarAgenda.link
  ) {
    communicationWorksUrl =
      queryResponse.page.communicationWorks.northSeminarAgenda.link;
  }

  if (
    queryResponse &&
    queryResponse.page &&
    queryResponse.page.communicationWorks &&
    queryResponse.page.communicationWorks.southSeminarAgenda &&
    queryResponse.page.communicationWorks.southSeminarAgenda.link
  ) {
    communicationWorksSouthUrl =
      queryResponse.page.communicationWorks.southSeminarAgenda.link;
  }

  return {
    title: queryResponse.page.title,
    content,
    communicationWorksUrl,
    communicationWorksSouthUrl,
  };
};

// This class was built so the replaceAll could be chained
export class Replaceable {
  constructor(content) {
    this.content = content;
  }

  replaceAll(find, replace) {
    this.content = this.content.replace(new RegExp(find, "g"), replace);
    return this;
  }

  toString() {
    return this.content;
  }
}
