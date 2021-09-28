import "../styles/globals.css";
import { DefaultHead } from "../components/default-head";
import { ChakraProvider } from "@chakra-ui/react";
import { SSRProvider } from "@react-aria/ssr";

import { GlobalsContext } from "../lib/global-props/context";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { useEffect } from "react";
import NextNProgress from "../components/progress-bar";
import { UncaughtError } from "../components/uncaught-error/uncaught-error";

import "polyfill-object.fromentries";
import MarkdownLayout from "../components/markdown-layout";

const theme = createTheme();

function MyApp({
  Component,
  pageProps: { globalProps = {}, seo = {}, uncaughtError, ...pageProps },
  router,
}) {
  if (router.route.includes("/product-docs")) {
    return (
      <MarkdownLayout title={"Placeholder"} subtitle={"Placeholder"}>
        <Component {...pageProps} />
      </MarkdownLayout>
    );
  }

  if (uncaughtError) {
    return (
      <Providers globalProps={globalProps} seo={seo}>
        <UncaughtError error={uncaughtError} />
      </Providers>
    );
  }

  return (
    <Providers globalProps={globalProps} seo={seo}>
      <Component {...pageProps} />
    </Providers>
  );
}

const Providers = ({ children, globalProps, seo }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <GlobalsContext.Provider value={globalProps}>
      <DefaultHead {...seo} />
      <ThemeProvider theme={theme}>
        <ChakraProvider resetCSS={false}>
          <SSRProvider>
            <NextNProgress />
            {children}
          </SSRProvider>
        </ChakraProvider>
      </ThemeProvider>
    </GlobalsContext.Provider>
  );
};

export default MyApp;
