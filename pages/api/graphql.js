// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const expressPlayground = require("graphql-playground-middleware-express")
  .default;

const playgroundFunc = expressPlayground({
  endpoint: "https://acecentre.org.uk/graphql",
});

export default playgroundFunc;
