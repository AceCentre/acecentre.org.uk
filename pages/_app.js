import "../styles/globals.css";
import { DefaultHead } from "../components/default-head";
import { ChakraProvider } from "@chakra-ui/react";

import { GlobalsContext } from "../lib/global-props/context";

function MyApp({ Component, pageProps: { globalProps = {}, ...pageProps } }) {
  return (
    <GlobalsContext.Provider value={globalProps}>
      <DefaultHead />
      <ChakraProvider resetCSS={false}>
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalsContext.Provider>
  );
}

export default MyApp;
