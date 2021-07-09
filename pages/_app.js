import "../styles/globals.css";
import { DefaultHead } from "../components/default-head";
import { ChakraProvider } from "@chakra-ui/react";
import { SSRProvider } from "@react-aria/ssr";

import { GlobalsContext } from "../lib/global-props/context";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { globalProps = {}, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    console.log("First render");

    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <GlobalsContext.Provider value={globalProps}>
      <DefaultHead />
      <ChakraProvider resetCSS={false}>
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </ChakraProvider>
    </GlobalsContext.Provider>
  );
}

export default MyApp;
