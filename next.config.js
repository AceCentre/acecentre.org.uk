module.exports = {
  target: "serverless",
  i18n: {
    locales: ["en-GB"],
    defaultLocale: "en-GB",
  },
  images: {
    domains: ["acecentre.org.uk"],
  },
  async headers() {
    return [
      {
        source: "/api/graphiql",
        headers: [
          {
            key: "Content-Type",
            value: "text/html",
          },
        ],
      },
    ];
  },
};
