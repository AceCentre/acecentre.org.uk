const configMap = {
  test: {
    baseUrl: "https://internal.acecentre.org.uk",
  },
  development: {
    baseUrl: "https://internal.acecentre.org.uk",
  },
  production: {
    baseUrl: "https://acecentre.org.uk",
  },
};

const config = configMap[process.env.NODE_ENV] || configMap["dev"];

module.exports = config;
