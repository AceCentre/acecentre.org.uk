import { request, gql } from "graphql-request";

const ENDPOINT = "https://acecentre.org.uk/graphql";

const AllStaffQuery = gql`
  query AllStaff {
    staff(first: 100, where: { status: PUBLISH }) {
      nodes {
        title
        slug
        id
        status
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
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

const SingleEmployeeQuery = gql`
  query SingleEmployee($slug: ID!) {
    employee(idType: SLUG, id: $slug) {
      title
      slug
      id
      status
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
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
`;

export const getEmployee = async (slug) => {
  if (!slug) {
    return null;
  }

  const { employee } = await request(ENDPOINT, SingleEmployeeQuery, { slug });

  if (!employee) return null;

  return nodeToEmployee(employee);
};

export const getAllStaff = async () => {
  const queryResponse = await request(ENDPOINT, AllStaffQuery);

  const allStaff = queryResponse.staff.nodes.map(nodeToEmployee);

  return allStaff;
};

const nodeToEmployee = (node) => {
  const location = getLocation(node);
  const groups = getGroups(node);
  const staffDetails = getStaffDetails(node);
  const imageUrl = getImageUrl(node);

  return {
    name: node.title,
    slug: node.slug,
    longDescription: node.content,
    location,
    groups,
    imageUrl,
    ...staffDetails,
  };
};

const getImageUrl = (node) => {
  if (!node.featuredImage) return null;
  if (!node.featuredImage.node) return null;
  if (!node.featuredImage.node.sourceUrl) return null;

  return node.featuredImage.node.sourceUrl;
};

const getStaffDetails = ({ staffDetails = {} }) => {
  if (!staffDetails) {
    return {
      works: null,
      role: null,
      lastName: null,
      firstName: null,
      email: null,
      directLine: null,
    };
  }

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
