import { request, gql } from "graphql-request";

const ENDPOINT = "https://acecentre.org.uk/graphql";

const AllTrusteesQuery = gql`
  query MyQuery {
    trustees {
      nodes {
        trusteeDetails {
          role
          quote
          dateJoined
          about
        }
        title
        slug
      }
    }
  }
`;

export const getAllTrustees = async () => {
  const queryResponse = await request(ENDPOINT, AllTrusteesQuery);

  return queryResponse.trustees.nodes.map((node) => {
    const trusteeDetails = getTrusteeDetails(node);

    return {
      name: node.title,
      slug: node.slug,
      ...trusteeDetails,
    };
  });
};

const getTrusteeDetails = ({ trusteeDetails = {} }) => {
  if (!trusteeDetails)
    return { about: null, joined: null, quote: null, role: null };

  const about = trusteeDetails.about || null;
  const joined = trusteeDetails.dateJoined || null;
  const quote = trusteeDetails.quote || null;
  const role = trusteeDetails.role || null;

  return {
    about,
    joined,
    quote,
    role,
  };
};
