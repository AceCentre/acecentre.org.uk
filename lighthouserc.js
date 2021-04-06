const getTargetBaseUrl = () => {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }

  return "http://localhost:3000";
};

module.exports = {
  ci: {
    collect: {
      url: [getTargetBaseUrl()],
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
