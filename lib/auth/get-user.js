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

export async function getUser(req) {
  const user = req.session.get("user");
  const response = await clientRequest(req, GET_USER, {
    userId: user.userId,
  });

  return response.user;
}
