import { gql } from "graphql-request";
import { request } from "./data-fetching";

import config from "./config";

const ENDPOINT = `${config.baseUrl}/graphql`;

// Get the first 3 posts in General
const getJobs = gql`
  query getJobs {
    jobs(first: 1000) {
      nodes {
        title
        content
        meta {
          advertLink
          salary
          contract
          location
          workingPattern
          closingDate
        }
      }
    }
  }
`;

export const getAllJobs = async () => {
  const { jobs } = await request(ENDPOINT, getJobs);
  const nodes = jobs.nodes || [];

  return nodes
    .filter((job) => {
      const [day, month, year] = job.meta.closingDate.split("/");

      const closingDate = new Date(`${month}/${day}/${year}`);
      const nowDate = new Date();

      return nowDate.getTime() < closingDate.getTime();
    })
    .map((job) => {
      return {
        closingDate: job.meta.closingDate,
        title: job.title,
        applyAt: job.meta.advertLink,
        salary: job.meta.salary,
        contract: job.meta.contract,
        location: job.meta.location,
        workingPattern: job.meta.workingPattern,
        description: job.content,
      };
    });
};
