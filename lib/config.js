const redisConnectionString = process.env.REDIS_URL;
const imageUrl = process.env.IMAGE_URL;

// This is specific to a branch
const deployKey = process.env.DEPLOY_KEY;

// This is specific to a workflow run
const buildId = process.env.BUILD_ID;

const useLiveData = process.env.USE_LIVE_DATA === "true";

// Slack
const slackToken = process.env.SLACK_TOKEN;
const slackSecret = process.env.SLACK_SECRET;

// posthogKey
const posthogKey = "phc_Nlj20BgEB3vtw36wCPHFpTTVqpmvEzfD3IrG5zw7B2h";

const isRuntime = !!process.env.RUNTIME;

const configMap = {
  test: {
    isRuntime,
    launchpadUrl: "https://launchpad.acecentre.org.uk",
    imageLoaders: {
      normal: "cloudinaryLoader",
      square: "cropToSquareLoaderCloudinary",
    },
    debugDataFetch: false,
    deployKey: "test",
    buildId: 0,
    imageUrl,
    baseUrl: "https://digitalocean.acecentre.org.uk",
    environment: "test",
    stripeApiKey: "stripeKey",

    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 60,
    },
    slack: {
      token: "token",
      signingSecret: "secret",
    },
    posthogKey,
  },
  development: {
    isRuntime,
    launchpadUrl: "https://launchpad.acecentre.org.uk",

    imageLoaders: {
      normal: "rawLoader",
      square: "rawLoader",
      unoptimized: true,
    },
    debugDataFetch: true,
    deployKey: "dev",
    buildId: "dev",

    imageUrl,
    baseUrl: useLiveData
      ? "https://backend.acecentre.org.uk"
      : "https://digitalocean.acecentre.org.uk",
    environment: "development",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",

    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 240,
    },
    slack: {
      token: slackToken,
      signingSecret: slackSecret,
    },
    posthogKey,
  },
  preview: {
    isRuntime,
    launchpadUrl: "https://launchpad.acecentre.org.uk",

    imageLoaders: {
      normal: "cloudinaryLoader",
      square: "cropToSquareLoaderCloudinary",
    },
    debugDataFetch: true,
    deployKey,
    buildId,
    imageUrl,
    environment: "preview",
    baseUrl: "https://digitalocean.acecentre.org.uk",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",

    redisOptions: {
      connectionString: redisConnectionString,
      // 2 Days
      // We rebuild every day so they will be old before they
      // timeout
      ttl: 172800,
    },
    slack: {
      token: slackToken,
      signingSecret: slackSecret,
    },
    posthogKey,
  },
  production: {
    isRuntime,
    launchpadUrl: "https://launchpad.acecentre.org.uk",

    imageLoaders: {
      normal: "cloudinaryLoader",
      square: "cropToSquareLoaderCloudinary",
    },
    debugDataFetch: true,
    deployKey,
    buildId,
    imageUrl,
    environment: "production",
    baseUrl: "https://backend.acecentre.org.uk",
    stripeApiKey: "pk_live_z1TrNrKXCGXCsgpCqkyyxWhd",

    redisOptions: {
      connectionString: redisConnectionString,
      // 2 Days
      // We rebuild every day so they will be old before they
      // timeout
      ttl: 172800,
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
