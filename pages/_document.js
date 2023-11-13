import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { extendTheme } from "../lib/chakra-theme";

const chakraTheme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
});

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,400;0,500;0,700;1,100;1,500;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap"
            rel="stylesheet"
          ></link>
          <script
            defer
            data-domain="acecentre.org.uk"
            src="https://stats.acecentre.org.uk/js/plausible.js"
          ></script>
        </Head>
        <body style={{ color: "#333333" }}>
          <ColorModeScript
            initialColorMode={chakraTheme.config.initialColorMode}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.displayName = "MyDocument";

export default MyDocument;
