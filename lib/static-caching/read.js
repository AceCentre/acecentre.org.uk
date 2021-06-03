import { writeToStaticCache } from "./write";
import { environment } from "../config";

/**
 *
 * @param {*} cacheKey - The key that we use to read the cache.
 */
export const readFromStaticCache = async (cacheKey, redis) => {
  const fullCacheKey = `${environment}-${cacheKey}`;
  const value = await redis.get(fullCacheKey);

  return JSON.parse(value);
};

export const readFromStaticCacheWithFallback = async (
  cacheKey,
  redis,
  fallback
) => {
  const fromCache = await readFromStaticCache(cacheKey, redis);

  // If we have read it from the cache then we return it
  if (fromCache !== null) {
    return fromCache;
  }

  // Call fallback to get the data
  const fetched = await fallback();

  // Write the new data to the cache
  writeToStaticCache(cacheKey, fetched);

  return fetched;
};
