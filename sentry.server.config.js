// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://30f18363ee6b4cb88b8f73d901a7ae84@o975862.ingest.sentry.io/4505199109210112",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  ignoreErrors: [
    // This error comes from Microsofts outlook crawler
    "Non-Error promise rejection captured with value: Object Not Found Matching Id",
  ],
});
