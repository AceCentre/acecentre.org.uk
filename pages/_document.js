import Document, { Html, Head, Main, NextScript } from "next/document";
import config from "../lib/config";

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
        </Head>
        <body style={{ color: "#333333" }}>
          <Main />
          <NextScript />
          {config.environment == "production" && (
            <div
              dangerouslySetInnerHTML={{
                __html: `
          
            <script>
              !function(){var e=function(){var e,t=document.getElementsByTagName("body")[0];(e=document.createElement("script")).async=1,e.src="https://s3-us-west-2.amazonaws.com/o-t/vf/v.min.js",t.appendChild(e),(e=document.createElement("script")).async=1,e.src="https://s3-us-west-2.amazonaws.com/o-t/vf/c-3.0.4.min.js",t.appendChild(e)},t=function(e){window.jQuery?e():setTimeout(function(){t(e)},50)};window.onload=function(){window.teidvf=5451,window.tio_vf_eat="x7LgPCUN";var n=document.getElementsByTagName("head")[0],s=document.createElement("link");if(s.rel="stylesheet",s.type="text/css",s.href="https://s3-us-west-2.amazonaws.com/o-t/vf/s.min.css",n.appendChild(s),"undefined"==typeof jQuery){var a=document.createElement("script");a.async=1,a.src="https://s3-us-west-2.amazonaws.com/o-t/vf/j.min.js",n.appendChild(a)}t(e)}}();
            </script>
          `,
              }}
            ></div>
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
