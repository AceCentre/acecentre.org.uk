const redisConnectionString = process.env.REDIS_URL;
const githubSha = process.env.GITHUB_SHA;

const configMap = {
  test: {
    baseUrl: "https://internal.acecentre.org.uk",
    environment: "test",
    stripeApiKey: "stripeKey",
    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 60,
      prefix: "local",
    },
  },
  development: {
    baseUrl: "https://internal.acecentre.org.uk",
    environment: "development",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",
    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 60,
      prefix: "dev",
    },
  },
  preview: {
    environment: "preview",
    baseUrl: "https://internal.acecentre.org.uk",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",
    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 600,
      prefix: githubSha,
    },
  },
  production: {
    environment: "production",
    baseUrl: "https://acecentre.org.uk",
    stripeApiKey: "pk_test_S2985RtwuAkWDftXPenQVzTw",
    redisOptions: {
      connectionString: redisConnectionString,
      ttl: 86400,
      prefix: githubSha,
    },
  },
};

let currentEnvironment = process.env.NODE_ENV;
console.log("========================================");
console.log("Initial current environment", currentEnvironment);

if (process.env.NETLIFY && process.env.CONTEXT === "production") {
  currentEnvironment = "production";
}

if (process.env.NETLIFY && process.env.CONTEXT === "deploy-preview") {
  currentEnvironment = "preview";
}
if (process.env.NETLIFY && process.env.CONTEXT === "deploy-branch") {
  currentEnvironment = "preview";
}

console.log("Final current environment", currentEnvironment);
console.log("NETLIFY: ", process.env.NETLIFY);
console.log("CONTEXT: ", process.env.CONTEXT);
console.log("========================================");

const config = configMap[currentEnvironment] || configMap["development"];

module.exports = config;
