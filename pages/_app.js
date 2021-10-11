import "../styles/globals.css";
import { DefaultHead } from "../components/default-head";
import { ChakraProvider } from "@chakra-ui/react";
import { SSRProvider } from "@react-aria/ssr";

import { GlobalsContext } from "../lib/global-props/context";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { useEffect, useState } from "react";
import NextNProgress from "../components/progress-bar";
import { UncaughtError } from "../components/uncaught-error/uncaught-error";

import "polyfill-object.fromentries";
import { SkipLink } from "../components/skip-link/skip-link";
import { v4 as uuid } from "@lukeed/uuid";
import posthog from "posthog-js";
import config from "../lib/config";

const theme = createTheme();

function MyApp({
  Component,
  pageProps: { globalProps = {}, seo = {}, uncaughtError, ...pageProps },
}) {
  const [posthogLoaded, setPosthogLoaded] = useState(false);

  useEffect(() => {
    posthog.init(config.posthogKey, {
      api_host: "https://app.posthog.com",
      persistence: "memory",
      autocapture: false,
      disable_cookie: true,
      capture_pageview: false,
      disable_session_recording: true,
      loaded: (posthog) => {
        // posthog.identify(uuid());
        setPosthogLoaded(true);
      },
    });
  }, []);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <SkipLink />
      <GlobalsContext.Provider value={{ ...globalProps, posthogLoaded }}>
        <DefaultHead {...seo} />
        <ThemeProvider theme={theme}>
          <ChakraProvider resetCSS={false}>
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
