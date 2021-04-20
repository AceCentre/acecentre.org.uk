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
        staffDetails {
          works
          role
          lastName
          firstName
          email
          directLine
        }
        staffLocations {
          nodes {
            name
          }
        }
        staffTypes {
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
    const groups = getGroups(node);
    const staffDetails = getStaffDetails(node);

    return {
      name: node.title,
      slug: node.slug,
      longDescription: node.content,
      location,
      groups,
      ...staffDetails,
    };
  });

  return allStaff;
};

const getStaffDetails = ({ staffDetails = {} }) => {
  const works = staffDetails.works || null;
  const role = staffDetails.role || null;
  const lastName = staffDetails.lastName || null;
  const firstName = staffDetails.firstName || null;
  const email = staffDetails.email || null;
  const directLine = staffDetails.directLine || null;

  return {
    works,
    role,
    lastName,
    firstName,
    email,
    directLine,
  };
};

const getGroups = (node) => {
  return node.staffTypes.nodes.map(({ name }) => name);
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
