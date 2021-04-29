import { gql, GraphQLClient } from "graphql-request";
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
    }
  }
`;

export async function getUser(req) {
  const user = req.session.get("user");

  const client = new GraphQLClient(ENDPOINT, {
    headers: {
      authorization: `Bearer ${user.authToken}`,
    },
  });

  const response = await client.request(GET_USER, {
    userId: user.userId,
  });

  return response.user;
}
