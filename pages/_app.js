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
import { useRouter } from "next/router";

const theme = createTheme();

const chakraTheme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
});

function MyApp({
  Component,
  pageProps: { globalProps = {}, seo = {}, uncaughtError, ...pageProps },
}) {
  const router = useRouter();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      // eslint-disable-next-line no-undef
      if (gtag) {
        console.log("PING", url);
        // eslint-disable-next-line no-undef
        gtag("event", "conversion", {
          send_to: "AW-10885468875/F2ukCJTx8bQDEMulzMYo",
        });
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
            src="https://www.googletagmanager.com/gtag/js?id=G-5PYYXEH8M9"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-5PYYXEH8M9');
            `}
          </Script>
          <Script
            id="cookieyes"
            src="https://cdn-cookieyes.com/client_data/5f7bdf61622959f12d1b8723/script.js"
            strategy="afterInteractive"
          ></Script>
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
