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
        staffLocations {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const getAllStaff = async () => {
  const endpoint = "https://acecentre.org.uk/graphql";

  const queryResponse = await request(endpoint, AllStaffQuery);

  const allStaff = queryResponse.staff.nodes.map((node) => {
    const location = getLocation(node);

    return {
      name: node.title,
      slug: node.slug,
      longDescription: node.content,
      location,
    };
  });

  return allStaff;
};

const getLocation = (node) => {
  let location = null;
  const locations = node.staffLocations.nodes;

  if (locations.length > 0) {
    location = locations[0].name;
  }

  return location;
};

export default getAllStaff;
