import Head from "next/head";
import { Nav } from "../components/nav/nav";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="Description" content="Put your description here." />
      </Head>
      <header>
        <Nav />
      </header>
    </>
  );
}
