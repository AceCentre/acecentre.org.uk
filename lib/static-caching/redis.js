import asyncRedis from "async-redis";
import { redisOptions } from "../config";

const client = asyncRedis.createClient(redisOptions.connectionString);

client.on("error", function (err) {
  console.log("Error " + err);
});

export default client;
