import { ApolloClient, InMemoryCache } from "@apollo/client";
import config from "./config";

const client = new ApolloClient({
  uri: config.baseUrl + "/graphql",
  cache: new InMemoryCache(),
});

export default client;
