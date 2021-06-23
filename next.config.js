module.exports = {
  target: "serverless",
  images: {
    images: {
      loader: "cloudinary",
      path: "https://res.cloudinary.com/ace-cloud/image/upload/",
    },
    domains: ["acecentre.org.uk", "internal.acecentre.org.uk"],
  },
};
