import { ApolloProvider } from "@apollo/client";
import Head from "next/head";

import client from "../lib/apollo-client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AceCentre</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="Description" content="AceCentre" />
      </Head>

      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
