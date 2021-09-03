import { gql, GraphQLClient } from "graphql-request";
import { clientRequest } from "../client-request";
import config from "../config";

const ENDPOINT = `${config.baseUrl}/graphql`;
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
  query GetAddresses($id: ID!) {
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
        state
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
        state
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

const CHANGE_PASSWORD = gql`
  mutation changePassword($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
      __typename
    }
  }
`;

export async function getUser(req, res) {
  const user = req.session.get("user");
  const response = await clientRequest(req, res, GET_USER, {
    userId: user.userId,
  });

  return response.user;
}

export async function getAddresses(req, res, user) {
  const response = await clientRequest(req, res, GET_ADDRESSES, {
    id: user.customerId,
  });

  const billingDetails = response?.customer?.billing || {};
  const shippingDetails = response?.customer?.shipping || {};

  const countries = response["__type"].enumValues.sort((a, b) =>
    a.description.localeCompare(b.description)
  );

  return { billingDetails, shippingDetails, countries };
}

export async function getUserDetails(req, res, user) {
  const response = await clientRequest(req, res, GET_DETAILS, {
    userId: user.userId,
  });

  return {
    displayName: response.user.name,
    firstName: response.user.firstName,
    lastName: response.user.lastName,
    email: response.user.email,
  };
}

export async function changePassword(req, res, user) {
  await clientRequest(req, res, CHANGE_PASSWORD, {
    username: user.username,
  });
}

export async function resetPassword(req, res, username) {
  let headers = {};
  if (req && req.socket && req.socket.remoteAddress) {
    headers["X-Forwarded-For"] = req.socket.remoteAddress;
  }

  if (req && req.headers && req.headers["client-ip"]) {
    headers["X-Forwarded-For"] = req.headers["client-ip"];
  }

  const client = new GraphQLClient(ENDPOINT, {
    headers,
  });

  try {
    const { headers: responseHeaders } = await client.rawRequest(
      CHANGE_PASSWORD,
      {
        username,
      }
    );

    res.setHeader("set-cookie", responseHeaders.get("set-cookie"));
  } catch (error) {
    const errors = error?.response?.errors || [];
    const mainError = errors[0] || null;
    const errorMessage = mainError?.message || "An error has occurred";

    // Swallow invalid username error
    if (errorMessage !== "Invalid username.") {
      throw error;
    }

    console.warn(errorMessage);
  }
}
