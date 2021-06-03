import { environment, redisOptions } from "../config";

/**
 * Cache data to use during the build process. Do not use at runtime
 *
 * @param {*} cacheKey - The key that we use to store the cache. Must be a valid filename (without the extension)
 * @param {*} data - Must be JSON serializable
 */
export const writeToStaticCache = async (cacheKey, data, redis) => {
  const fullCacheKey = `${environment}-${cacheKey}`;
  const value = JSON.stringify(data);

  await redis.set(fullCacheKey, value, "EX", redisOptions.ttl);
};
