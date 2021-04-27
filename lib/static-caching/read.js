import fs from "fs";
import path from "path";

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
