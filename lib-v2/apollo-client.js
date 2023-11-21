import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://backend.acecentre.org.uk/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
