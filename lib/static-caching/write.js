import fs from "fs";
import path from "path";

const CACHE_FOLDER = path.join(__dirname, "../../.static-cache");

/**
 * Cache data to use during the build process. Do not use at runtime
 *
 * @param {*} cacheKey - The key that we use to store the cache. Must be a valid filename (without the extension)
 * @param {*} data - Must be JSON serializable
 */
export const writeToStaticCache = (cacheKey, data) => {
  const cacheFilePath = `${CACHE_FOLDER}/${cacheKey}.json`;
  const dataToWrite = JSON.stringify(data);

  const doesCacheExist = fs.existsSync(CACHE_FOLDER);

  // Create the cache folder if it doesn't exist
  if (!doesCacheExist) {
    fs.mkdirSync(CACHE_FOLDER, {
      recursive: true,
    });
  }

  // Remove the file if it exists
  try {
    fs.unlinkSync(cacheFilePath);
  } catch (e) {
    // We swallow ENOENT errors and throw the rest
    // We get a ENOENT when we can't delete the file
    // because it doesn't exist
    if (!e.code === "ENOENT") throw e;
  }

  // Write the file to cache
  fs.writeFileSync(cacheFilePath, dataToWrite);
};
