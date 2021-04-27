// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import config from "../config";

const URL = `${config.baseUrl}/graphql`;

const expressPlayground = require("graphql-playground-middleware-express")
  .default;

const playgroundFunc = expressPlayground({
  endpoint: URL,
});

export default playgroundFunc;
