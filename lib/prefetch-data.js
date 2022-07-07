import { GetAllProductsQuery } from "./products/get-products";
import { hrtime } from "process";
import config from "./config";
import { request } from "./data-fetching";
import { GetAllProductCategories } from "./products/get-all-categories";

const getTotalTime = (startTime) => {
  const [totalSeconds, remainingNanoSeconds] = hrtime(startTime);
  const remainingMs = Math.floor(remainingNanoSeconds / 1000000);
  const totalMs = totalSeconds * 1000 + remainingMs;

  const overallSeconds = totalMs / 1000;

  return overallSeconds;
};

const PREFETCH_LIST = [
  { query: GetAllProductsQuery },
  { query: GetAllProductCategories },
];

const ENDPOINT = `${config.stellateUrl}`;

export const prefetchAll = async () => {
  const startTime = hrtime();

  const promises = PREFETCH_LIST.map(({ query, params }) => {
    return request(ENDPOINT, query, params);
  });

  await Promise.all(promises);

  const totalTime = getTotalTime(startTime);

  console.log("");
  console.log("Prefetching finished in: ", totalTime);
  console.log("Prefetch amount: ", PREFETCH_LIST.length);
  console.log("");
};
