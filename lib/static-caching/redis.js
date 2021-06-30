import asyncRedis from "async-redis";
import config from "../config";

const client = asyncRedis.createClient(config.redisOptions.connectionString, {
  prefix: `${config.buildId}-${config.deployKey}-`,
});

client.on("error", function (err) {
  console.log("Error " + err);
});

export default client;
