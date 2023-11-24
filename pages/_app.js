import "../styles/globals.css";
import { DefaultHead } from "../components/default-head";
import { ChakraProvider } from "@chakra-ui/provider";
import { SSRProvider } from "@react-aria/ssr";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useEffect } from "react";
import NextNProgress from "../components/progress-bar";
import { UncaughtError } from "../components/uncaught-error/uncaught-error";

import "polyfill-object.fromentries";
import { SkipLink } from "../components/skip-link/skip-link";

import { useLoggedInStatus } from "../lib/use-logged-in-status";
import { extendTheme } from "../lib/chakra-theme";
import Script from "next/script";
import { useRouter } from "next/router";
import config from "../lib/config";
import { AuthContext } from "../lib/auth-hook";

const theme = createTheme();

const chakraTheme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
});

// eslint-disable-next-line no-unused-vars
function MyApp({
  Component,
  pageProps: { seo = {}, uncaughtError, trace, ...pageProps },
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
      if (typeof gtag !== "undefined" && gtag) {
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
      <AuthContext.Provider
        value={{
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
          {config.environment === "production" && (
            <Script
              id="cookieyes"
              src="https://cdn-cookieyes.com/client_data/5f7bdf61622959f12d1b8723/script.js"
              strategy="afterInteractive"
            ></Script>
          )}
        </>
        <ThemeProvider theme={theme}>
          <ChakraProvider theme={chakraTheme} resetCSS={false}>
            <SSRProvider>
              <NextNProgress />
              {uncaughtError ? (
                <UncaughtError error={uncaughtError} trace={trace} />
              ) : (
                <Component {...pageProps} />
              )}
            </SSRProvider>
          </ChakraProvider>
        </ThemeProvider>
      </AuthContext.Provider>
    </>
  );
}

const MaintenancePage = () => (
  <>
    <title>Site Maintenance</title>
    <style jsx>
      {`
        body {
          text-align: center;
          padding: 150px;
        }

        h1 {
          font-size: 50px;
        }

        body {
          font: 20px Helvetica, sans-serif;
          color: #333;
        }

        article {
          display: block;
          text-align: left;
          width: 650px;
          margin: 0 auto;
        }

        a {
          color: #dc8100;
          text-decoration: none;
        }

        a:hover {
          color: #333;
          text-decoration: none;
        }

        .hidden {
          display: none;
        }
      `}
    </style>

    <article>
      <h1>We&rsquo;ll be back soon!</h1>
      <div>
        <p>
          Sorry for the inconvenience but we&rsquo;re performing some
          maintenance at the moment. If you need to you can always{" "}
          <a href="mailto:enquiries@acecentre.org.uk">contact us</a>, otherwise
          we&rsquo;ll be back online shortly!
        </p>
        <p>&mdash; The Ace Centre Team</p>
      </div>
      <span className="hidden">Netlify</span>
    </article>
  </>
);

export default MaintenancePage;
