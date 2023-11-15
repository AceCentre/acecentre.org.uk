// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
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
