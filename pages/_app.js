import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { DefaultHead } from "../components/default-head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultHead />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
