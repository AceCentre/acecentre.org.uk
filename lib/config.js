const redisConnectionString = process.env.REDIS_URL;
const imageUrl = process.env.IMAGE_URL;

// This is specific to a branch
const deployKey = process.env.DEPLOY_KEY;

// This is specific to a workflow run
const buildId = process.env.BUILD_ID;

const configMap = {
  test: {
    enableBundleAnalyzer: false,
    deployKey: "test",
    buildId: 0,
    imageUrl,
    baseUrl: "https://internal.acecentre.org.uk",
    environment: "test",
    stripeApiKey: "stripeKey",
    prometheus: {
      host:
        "https://prometheus-blocks-prod-us-central1.grafana.net/api/prom/push",
      user: 80617,
      password: process.env.PROM_KEY,
    },
    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 60,
    },
  },
  development: {
    enableBundleAnalyzer: false,
    deployKey: "dev",
    buildId: 0,
    imageUrl,
    baseUrl: "https://internal.acecentre.org.uk",
    environment: "development",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",
    prometheus: {
      host:
        "https://prometheus-blocks-prod-us-central1.grafana.net/api/prom/push",
      user: 80617,
      password: process.env.PROM_KEY,
    },
    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 60,
    },
  },
  preview: {
    enableBundleAnalyzer: true,
    deployKey,
    buildId,
    imageUrl,
    environment: "preview",
    baseUrl: "https://internal.acecentre.org.uk",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",
    prometheus: {
      host:
        "https://prometheus-blocks-prod-us-central1.grafana.net/api/prom/push",
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
  },
  production: {
    enableBundleAnalyzer: false,
    deployKey,
    buildId,
    imageUrl,
    environment: "production",
    baseUrl: "https://acecentre.org.uk",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",
    prometheus: {
      host:
        "https://prometheus-blocks-prod-us-central1.grafana.net/api/prom/push",
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
