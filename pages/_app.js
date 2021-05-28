import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SSRProvider, Provider, defaultTheme } from "@adobe/react-spectrum";
import { DefaultHead } from "../components/default-head";
import { GlobalsContext } from "../lib/global-props/context";

function MyApp({ Component, pageProps: { globalProps = {}, ...pageProps } }) {
  return (
    <GlobalsContext.Provider value={globalProps}>
      <SSRProvider>
        <Provider theme={defaultTheme}>
          <Component {...pageProps} />
        </Provider>
      </SSRProvider>
      <DefaultHead />
    </GlobalsContext.Provider>
  );
}

export default MyApp;
