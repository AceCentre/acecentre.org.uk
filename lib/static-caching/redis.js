import asyncRedis from "async-redis";
import config from "../config";

// How long we wait for a Redis command before treating Redis as unavailable.
export const COMMAND_TIMEOUT_MS = 3000;
// After a failure we skip Redis entirely for this long, so pages and builds
// don't each wait for the timeout while Redis is down.
export const COOLDOWN_MS = 30 * 1000;

const client = asyncRedis.createClient(config.redisOptions.connectionString, {
  prefix: `${config.buildId}-${config.deployKey}-`,
  // node-redis waits up to an hour to connect by default, so an unreachable
  // Redis makes builds hang silently. Fail fast and keep retrying in the
  // background with a capped backoff.
  connect_timeout: 5000,
  retry_strategy: (options) => Math.min(options.attempt * 200, 2000),
});

client.on("error", function (err) {
  console.log("Error " + err);
});

let unavailableUntil = 0;

const withTimeout = (promise) => {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () =>
        reject(new Error(`Redis command timed out after ${COMMAND_TIMEOUT_MS}ms`)),
      COMMAND_TIMEOUT_MS
    );
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};

// Runs a Redis command, but never throws and never hangs: if Redis is slow,
// down or erroring we log it and return the fallback, which callers treat as
// a cache miss.
const guarded = async (name, command, fallback) => {
  if (Date.now() < unavailableUntil) {
    return fallback;
  }

  try {
    return await withTimeout(command());
  } catch (err) {
    unavailableUntil = Date.now() + COOLDOWN_MS;
    console.log(
      `Redis ${name} failed, continuing without the cache for ${
        COOLDOWN_MS / 1000
      }s:`,
      err && err.message
    );
    return fallback;
  }
};

export const safeGet = (key) => guarded("get", () => client.get(key), null);

export const safeSet = (key, value, ...args) =>
  guarded("set", () => client.set(key, value, ...args), null);

// Only for tests: clear the "Redis is down" cooldown.
export const resetRedisCooldown = () => {
  unavailableUntil = 0;
};

export default client;
