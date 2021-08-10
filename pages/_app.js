import "../styles/globals.css";
import { DefaultHead } from "../components/default-head";
import { ChakraProvider } from "@chakra-ui/react";
import { SSRProvider } from "@react-aria/ssr";

import { GlobalsContext } from "../lib/global-props/context";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { useEffect } from "react";
import NextNProgress from "../components/progress-bar";

const theme = createTheme();

function MyApp({ Component, pageProps: { globalProps = {}, ...pageProps } }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <GlobalsContext.Provider value={globalProps}>
      <DefaultHead />
      <ThemeProvider theme={theme}>
        <ChakraProvider resetCSS={false}>
          <SSRProvider>
            <NextNProgress />
            <Component {...pageProps} />
          </SSRProvider>
        </ChakraProvider>
      </ThemeProvider>
    </GlobalsContext.Provider>
  );
}

export default MyApp;
