import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      sessionToken
      refreshToken
      user {
        name
        email
      }
    }
  }
`;
