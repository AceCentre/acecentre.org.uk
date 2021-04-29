import Head from "next/head";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AceCentre</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="Description" content="AceCentre" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
