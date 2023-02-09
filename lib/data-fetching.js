import { request as graphqlRequest } from "graphql-request";
import crypto from "crypto";
import { parse } from "graphql";
import { hrtime } from "process";
import redis from "./static-caching/redis";
import config from "./config";

const hashString = (input) =>
  crypto.createHash("md5").update(input).digest("hex");

const getQueryName = (query) => {
  const parsedQuery = parse(query);
  if (!parsedQuery) throw new Error(`Could not parse query: ${query}`);

  if (!parsedQuery.definitions || parsedQuery.definitions.length !== 1) {
    throw new Error(`The query you gave must only have one query: ${query}`);
  }

  const definition = parsedQuery.definitions[0];

  if (!definition.name || !definition.name.value) {
    throw new Error(`Your query has no name ${query}`);
  }

  return definition.name.value;
};

const getTotalTime = (startTime) => {
  const [totalSeconds, remainingNanoSeconds] = hrtime(startTime);
  const remainingMs = Math.floor(remainingNanoSeconds / 1000000);
  const totalMs = totalSeconds * 1000 + remainingMs;

  const overallSeconds = totalMs / 1000;

  return overallSeconds;
};

const logResult = (
  startTime,
  uniqueIdentifier,
  queryName,
  dataFetchType,
  redisKey,
  cacheResult,
  redisEntryAge
) => {
  if (!config.debugDataFetch) return;
  if (config.environment === "test") return;

  const totalTime = getTotalTime(startTime);

  console.log("");
  console.log("QueryName: ", queryName);
  console.log("Time Taken: ", totalTime);
  console.log("Unique Identifier: ", uniqueIdentifier);

  if (redisKey) {
    console.log("Full redis key: ", redisKey);
  }

  if (cacheResult) {
    console.log("Cache: ", cacheResult);
  }

  if (redisEntryAge) {
    console.log("Redis Entry Age: ", redisEntryAge / 1000);
  }

  console.log("Fetched Using: ", dataFetchType);
  console.log("");
};

export const request = async (url, query, params) => {
  // Get some meta data about the query to log later
  const startTime = hrtime();
  const uniqueIdentifier = hashString(JSON.stringify({ url, query, params }));
  const queryName = getQueryName(query);

  // If we are in dev we just hit the network
  if (config.environment === "development") {
    const result = await graphqlRequest(url, query, params);
    logResult(startTime, uniqueIdentifier, queryName, "dev-hot-network");
    return result;
  }

  // If we are in test we just hit the network
  if (config.environment === "test") {
    const result = await graphqlRequest(url, query, params);
    logResult(startTime, uniqueIdentifier, queryName, "test-hot-network");
    return result;
  }

  // Get the value from redis
  const redisCacheKey = `${uniqueIdentifier}-${queryName}`;
  const redisPrefix = redis["__redisClient"].options.prefix;
  const fullRedisKeyForLogging = `${redisPrefix}${redisCacheKey}`;
  const value = await redis.get(redisCacheKey);
  const parsedResult = JSON.parse(value);

  if (
    parsedResult &&
    parsedResult.timeCreated &&
    Date.now() - parsedResult.timeCreated > 60 * 1000
  ) {
    // If the redis entry is older than 1 minute then we reset it in the background
    const backgroundRevalidate = async () => {
      const networkResult = await graphqlRequest(url, query, params);
      const redisValue = JSON.stringify({
        ...networkResult,
        timeCreated: Date.now(),
      });
      await redis.set(redisCacheKey, redisValue, "EX", config.redisOptions.ttl);
      logResult(
        startTime,
        uniqueIdentifier,
        queryName,
        "background-redis-update",
        fullRedisKeyForLogging
      );
    };
    // Not awaited on purpose to let it run in teh background
    backgroundRevalidate();
  }

  // If we successfully query redis, save that to local storage and return it
  if (parsedResult) {
    logResult(
      startTime,
      uniqueIdentifier,
      queryName,
      "redis-hit",
      fullRedisKeyForLogging,
      undefined,
      Date.now() - parsedResult.timeCreated
    );
    return parsedResult;
  }

  // Nothing else has worked so we fetch from network
  const networkResult = await graphqlRequest(url, query, params);

  // We then store the result in redis and local storage
  const redisValue = JSON.stringify({
    ...networkResult,
    timeCreated: Date.now(),
  });
  await redis.set(redisCacheKey, redisValue, "EX", config.redisOptions.ttl);

  logResult(
    startTime,
    uniqueIdentifier,
    queryName,
    "network-request",
    fullRedisKeyForLogging
  );

  return networkResult;
};
