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
import posthog from "posthog-js";
import config from "../lib/config";

const theme = createTheme();

// https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
function setWithExpiry(key, value, ttl) {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

const TTL = 3600000;

const useLoggedInStatus = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  useEffect(() => {
    const loggedInStatusFromStorage = getWithExpiry("loggedInStatus");

    if (loggedInStatusFromStorage !== null) {
      console.log(
        "Pulling logged in status from storage",
        loggedInStatusFromStorage
      );
      setLoggedInStatus(loggedInStatusFromStorage);
    } else {
      const getStatus = async () => {
        const response = await fetch("/api/auth/status");

        if (response.ok) {
          const { loggedIn } = await response.json();

          console.log("Pulling logged in status from network", loggedIn);
          setLoggedInStatus(loggedIn);
          setWithExpiry("loggedInStatus", loggedIn, TTL);
        } else {
          const loggedIn = false;
          console.log(
            "Couldn't get logged in status from network so falling back.",
            loggedIn
          );

          setLoggedInStatus(loggedIn);
          setWithExpiry("loggedInStatus", loggedIn, TTL);
        }
      };
      getStatus();
    }
  }, []);

  const refreshLoginStatus = async () => {
    console.log("Refreshing logged in status");

    localStorage.removeItem("loggedInStatus");
    const response = await fetch("/api/auth/status");

    if (response.ok) {
      const { loggedIn } = await response.json();

      console.log("Pulling logged in status from network", loggedIn);
      setLoggedInStatus(loggedIn);
      setWithExpiry("loggedInStatus", loggedIn, TTL);
    } else {
      const loggedIn = false;
      console.log(
        "Couldn't get logged in status from network so falling back.",
        loggedIn
      );

      setLoggedInStatus(loggedIn);
      setWithExpiry("loggedInStatus", loggedIn, TTL);
    }
  };

  return { loggedInStatus, refreshLoginStatus };
};

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
      loaded: () => {
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

  const { loggedInStatus, refreshLoginStatus } = useLoggedInStatus();

  return (
    <>
      <SkipLink />
      <GlobalsContext.Provider
        value={{
          ...globalProps,
          posthogLoaded,
          loggedInStatus,
          refreshLoginStatus,
        }}
      >
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
