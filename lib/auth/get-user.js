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
