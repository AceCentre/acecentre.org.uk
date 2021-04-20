import { request, gql } from "graphql-request";

const AllStaffQuery = gql`
  query AllStaff {
    staff(first: 100, where: { status: PUBLISH }) {
      nodes {
        title
        slug
        id
        status
        content
      }
    }
  }
`;

const getAllStaff = async () => {
  const endpoint = "https://acecentre.org.uk/graphql";

  const queryResponse = await request(endpoint, AllStaffQuery);

  const allStaff = queryResponse.staff.nodes.map((node) => {
    return {
      name: node.title,
    };
  });

  return allStaff;
};

export default getAllStaff;
