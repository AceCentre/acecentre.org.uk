import { request as graphqlRequest } from "graphql-request";
import crypto from "crypto";
import { parse } from "graphql";
import { hrtime } from "process";
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

const logResult = (totalTime, uniqueIdentifier, queryName, dataFetchType) => {
  console.log("");
  console.log("QueryName: ", queryName);
  console.log("Time Taken: ", totalTime);
  console.log("Unique Identifier: ", uniqueIdentifier);
  console.log("Fetched Using: ", dataFetchType);
  console.log("");
};

export const request = async (url, query, params) => {
  const startTime = hrtime();

  const uniqueIdentifier = hashString(JSON.stringify({ url, query, params }));
  const queryName = getQueryName(query);

  if (config.environment === "test" || config.environment === "development") {
    const result = await graphqlRequest(url, query, params);
    const totalTime = getTotalTime(startTime);

    logResult(totalTime, uniqueIdentifier, queryName, "dev-hot");

    return result;
  }

  return graphqlRequest(url, query, params);
};
