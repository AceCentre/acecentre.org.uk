const redisConnectionString = process.env.REDIS_URL;

const configMap = {
  test: {
    baseUrl: "https://internal.acecentre.org.uk",
    environment: "test",
    stripeApiKey: "stripeKey",
    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 60,
    },
  },
  development: {
    baseUrl: "https://internal.acecentre.org.uk",
    environment: "development",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",
    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 60,
    },
  },
  preview: {
    environment: "preview",
    baseUrl: "https://internal.acecentre.org.uk",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",
    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 600,
    },
  },
  production: {
    environment: "production",
    baseUrl: "https://acecentre.org.uk",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",
    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 86400,
    },
  },
};

let currentEnvironment = process.env.NODE_ENV;

if (process.env.NETLIFY && process.env.CONTEXT === "production") {
  currentEnvironment = "production";
}

if (process.env.NETLIFY && process.env.CONTEXT === "deploy-preview") {
  currentEnvironment = "preview";
}
if (process.env.NETLIFY && process.env.CONTEXT === "deploy-branch") {
  currentEnvironment = "preview";
}

const config = configMap[currentEnvironment] || configMap["development"];

module.exports = config;
