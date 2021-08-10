import { gql } from "graphql-request";
import { clientRequest } from "../client-request";

const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId, idType: ID) {
      name
      lastName
      nicename
      nickname
      id
      email
      wooSessionToken
    }
  }
`;

const GET_ADDRESSES = gql`
  query GetOrders($id: ID!) {
    customer(id: $id) {
      billing {
        firstName
        lastName
        company
        address1
        address2
        city
        postcode
        phone
        email
        country
      }
      shipping {
        firstName
        lastName
        company
        address1
        address2
        city
        postcode
        phone
        email
        country
      }
    }
    __type(name: "FullCountriesEnum") {
      enumValues {
        name
        description
      }
    }
  }
`;

const GET_DETAILS = gql`
  query GetUserDetails($userId: ID!) {
    user(id: $userId) {
      name
      lastName
      firstName
      email
    }
  }
`;

export async function getUser(req) {
  const user = req.session.get("user");
  const response = await clientRequest(req, GET_USER, {
    userId: user.userId,
  });

  return response.user;
}

export async function getAddresses(req, user) {
  const response = await clientRequest(req, GET_ADDRESSES, {
    id: user.customerId,
  });

  const billingDetails = response?.customer?.billing || {};
  const shippingDetails = response?.customer?.shipping || {};

  const countries = response["__type"].enumValues;

  return { billingDetails, shippingDetails, countries };
}

export async function getUserDetails(req, user) {
  const response = await clientRequest(req, GET_DETAILS, {
    userId: user.userId,
  });

  return {
    displayName: response.user.name,
    firstName: response.user.firstName,
    lastName: response.user.lastName,
    email: response.user.email,
  };
}
