const { gql } = require("graphql-request");
const { request } = require("../data-fetching");

const serviceFinderUrl =
  "https://https://servicefinder.acecentre.net/.netlify/functions/graphql";

const GET_ALL_SERVICES = gql`
  query GetAllServices {
    services {
      id
      serviceName
      phoneNumber
      website
      addressLines
      email
      ccgCodes
      caseload
      postcode
      provider
      note
      serviceColor
      communicationMatters
      servicesOffered {
        id
        title
        description
      }
    }
  }
`;

export const getAllServices = async () => {
  const { services } = await request(serviceFinderUrl, GET_ALL_SERVICES);

  return services;
};
