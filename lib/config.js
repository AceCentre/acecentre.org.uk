const configMap = {
  test: {
    baseUrl: "https://internal.acecentre.org.uk",
    environment: "test",
    ignoreAltWarning: false,
  },
  development: {
    baseUrl: "https://internal.acecentre.org.uk",
    environment: "development",
    ignoreAltWarning: true,
  },
  preview: {
    environment: "preview",
    baseUrl: "https://internal.acecentre.org.uk",
    ignoreAltWarning: false,
  },
  production: {
    environment: "production",
    baseUrl: "https://acecentre.org.uk",
    ignoreAltWarning: false,
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
