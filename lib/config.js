const redisConnectionString = process.env.REDIS_URL;
const imageUrl = process.env.IMAGE_URL;

// This is specific to a branch
const deployKey = process.env.DEPLOY_KEY;

// This is specific to a workflow run
const buildId = process.env.BUILD_ID;

// Mailchimp
const mailchimpServer = process.env.MAILCHIMP_SERVER;
const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;

const useDataFetchingCache = process.env.USE_DATA_FETCHING_CACHE === "true";
const useLiveData = process.env.USE_LIVE_DATA === "true";

// Slack
const slackToken = process.env.SLACK_TOKEN;
const slackSecret = process.env.SLACK_SECRET;

// posthogKey
const posthogKey = "phc_Nlj20BgEB3vtw36wCPHFpTTVqpmvEzfD3IrG5zw7B2h";

const cloudinaryCloud = process.env.CLOUDINARY_CLOUD || "ace-cloud";

const configMap = {
  test: {
    imageLoaders: {
      normal: "cloudinaryLoader",
      square: "cropToSquareLoaderCloudinary",
    },
    cloudinaryCloud,
    debugDataFetch: false,
    deployKey: "test",
    buildId: 0,
    imageUrl,
    baseUrl: "https://internal.acecentre.org.uk",
    environment: "test",
    stripeApiKey: "stripeKey",
    prometheus: {
      host: "https://prometheus-blocks-prod-us-central1.grafana.net/api/prom/push",
      user: 80617,
      password: process.env.PROM_KEY,
    },
    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 60,
    },
    mailchimp: {
      server: "FAKE",
      apiKey: "FAKE",
    },
    slack: {
      token: "token",
      signingSecret: "secret",
    },
    posthogKey,
  },
  development: {
    imageLoaders: {
      normal: "cloudinaryLoader",
      square: "cropToSquareLoaderCloudinary",
    },
    cloudinaryCloud,
    useDataFetchingCache,
    debugDataFetch: false,
    deployKey: "dev",
    buildId: 0,
    imageUrl,
    baseUrl: useLiveData
      ? "https://backend.acecentre.org.uk"
      : "https://internal.acecentre.org.uk",
    environment: "development",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",
    prometheus: {
      host: "https://prometheus-blocks-prod-us-central1.grafana.net/api/prom/push",
      user: 80617,
      password: process.env.PROM_KEY,
    },
    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 240,
    },
    mailchimp: {
      server: mailchimpServer,
      apiKey: mailchimpApiKey,
    },
    slack: {
      token: slackToken,
      signingSecret: slackSecret,
    },
    posthogKey,
  },
  preview: {
    imageLoaders: {
      normal: "cloudinaryLoader",
      square: "cropToSquareLoaderCloudinary",
    },
    cloudinaryCloud,
    debugDataFetch: false,
    deployKey,
    buildId,
    imageUrl,
    environment: "preview",
    baseUrl: "https://internal.acecentre.org.uk",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",
    prometheus: {
      host: "https://prometheus-blocks-prod-us-central1.grafana.net/api/prom/push",
      user: 80617,
      password: process.env.PROM_KEY,
    },
    redisOptions: {
      connectionString: redisConnectionString,
      // 2 Days
      // We rebuild every day so they will be old before they
      // timeout
      ttl: 172800,
    },
    mailchimp: {
      server: mailchimpServer,
      apiKey: mailchimpApiKey,
    },
    slack: {
      token: slackToken,
      signingSecret: slackSecret,
    },
    posthogKey,
  },
  production: {
    imageLoaders: {
      normal: "cloudinaryLoader",
      square: "cropToSquareLoaderCloudinary",
    },
    cloudinaryCloud,
    debugDataFetch: false,
    deployKey,
    buildId,
    imageUrl,
    environment: "production",
    baseUrl: "https://backend.acecentre.org.uk",
    stripeApiKey: "pk_live_z1TrNrKXCGXCsgpCqkyyxWhd",
    prometheus: {
      host: "https://prometheus-blocks-prod-us-central1.grafana.net/api/prom/push",
      user: 80617,
      password: process.env.PROM_KEY,
    },
    redisOptions: {
      connectionString: redisConnectionString,
      // 2 Days
      // We rebuild every day so they will be old before they
      // timeout
      ttl: 172800,
    },
    mailchimp: {
      server: mailchimpServer,
      apiKey: mailchimpApiKey,
    },
    slack: {
      token: slackToken,
      signingSecret: slackSecret,
    },
    posthogKey,
  },
};

let currentEnvironment = process.env.NODE_ENV;

if (process.env.CONTEXT === "production") {
  currentEnvironment = "production";
}

if (process.env.CONTEXT === "deploy-preview") {
  currentEnvironment = "preview";
}
if (process.env.CONTEXT === "deploy-branch") {
  currentEnvironment = "preview";
}

if (process.env.ENV === "development") {
  currentEnvironment = "development";
}

const config = configMap[currentEnvironment] || configMap["development"];

module.exports = config;
