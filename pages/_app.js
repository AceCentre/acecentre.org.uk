import "../styles/globals.css";
import { DefaultHead } from "../components/default-head";
import { ChakraProvider } from "@chakra-ui/react";
import { SSRProvider } from "@react-aria/ssr";

import { GlobalsContext } from "../lib/global-props/context";

function MyApp({ Component, pageProps: { globalProps = {}, ...pageProps } }) {
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
