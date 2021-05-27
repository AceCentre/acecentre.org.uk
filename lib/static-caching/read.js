import fs from "fs";
import path from "path";
import { writeToStaticCache } from "./write";

const CACHE_FOLDER = path.join(process.cwd(), ".static-cache");

/**
 *
 * @param {*} cacheKey - The key that we use to read the cache.
 */
export const readFromStaticCache = (cacheKey) => {
  const cacheFilePath = `${CACHE_FOLDER}/${cacheKey}.json`;

  try {
    const rawData = fs.readFileSync(cacheFilePath).toString();
    const data = JSON.parse(rawData);

    return data;
  } catch (e) {
    // If we get an ENOENT error then we have a cache miss, so
    // we return null
    if (e.code === "ENOENT") return null;

    // Throw any other errors
    throw e;
  }
};

export const readFromStaticCacheWithFallback = async (cacheKey, fallback) => {
  const fromCache = readFromStaticCache(cacheKey);

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
