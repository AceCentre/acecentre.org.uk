import "../styles/globals.css";
import { DefaultHead } from "../components/default-head";
import { ChakraProvider } from "@chakra-ui/provider";
import { SSRProvider } from "@react-aria/ssr";

import { GlobalsContext } from "../lib/global-props/context";

import createTheme from "@material-ui/core/styles/createTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

import { useEffect } from "react";
import NextNProgress from "../components/progress-bar";
import { UncaughtError } from "../components/uncaught-error/uncaught-error";

import "polyfill-object.fromentries";
import { SkipLink } from "../components/skip-link/skip-link";

import { useLoggedInStatus } from "../lib/use-logged-in-status";
import { extendTheme } from "../lib/chakra-theme";
import Script from "next/script";

const theme = createTheme();

const chakraTheme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
});

function MyApp({
  Component,
  pageProps: { globalProps = {}, seo = {}, uncaughtError, ...pageProps },
}) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const { loggedInStatus, refreshLoginStatus } = useLoggedInStatus();

  return (
    <>
      <SkipLink />
      <GlobalsContext.Provider
        value={{
          ...globalProps,
          loggedInStatus,
          refreshLoginStatus,
        }}
      >
        <DefaultHead {...seo} />
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-10885468875"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-10885468875');
            `}
          </Script>
        </>
        <ThemeProvider theme={theme}>
          <ChakraProvider theme={chakraTheme} resetCSS={false}>
            <SSRProvider>
              <NextNProgress />
              {uncaughtError ? (
                <UncaughtError error={uncaughtError} />
              ) : (
                <Component {...pageProps} />
              )}
            </SSRProvider>
          </ChakraProvider>
        </ThemeProvider>
      </GlobalsContext.Provider>
    </>
  );
}

export default MyApp;
