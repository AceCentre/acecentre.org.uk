import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { DefaultHead } from "../components/default-head";
import { GlobalsContext } from "../lib/global-props/context";

function MyApp({ Component, pageProps: { globalProps = {}, ...pageProps } }) {
  return (
    <GlobalsContext.Provider value={globalProps}>
      <DefaultHead />
      <Component {...pageProps} />
    </GlobalsContext.Provider>
  );
}

export default MyApp;
