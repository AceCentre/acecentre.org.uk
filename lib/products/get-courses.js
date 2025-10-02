import { request } from "../data-fetching";

import config from "../config";
// Moodle courses functionality removed - imports no longer needed

const GetAllReviews = `
  query GetAllTestimonials {
    testimonials(first: 1000) {
      nodes {
        slug
        content
      }
    }
  }
`;

// Moodle courses functionality removed - no longer needed

const ENDPOINT = `${config.baseUrl}/graphql`;

export const getCourseCount = async () => {
  // Moodle courses functionality removed - return 0
  return 0;
};

export const getMyCourses = async () => {
  // Moodle courses functionality removed - return empty array
  return [];
};

export const getRandomReviews = async () => {
  const response = await request(ENDPOINT, GetAllReviews);

  return getRandomElementsFromArray(response.testimonials.nodes);
};

const getRandomElementsFromArray = (array, count = 5) => {
  const randomArray = [];
  while (randomArray.length < count) {
    if (randomArray.length === array.length) {
      break;
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    if (randomArray.indexOf(randomIndex) === -1) {
      randomArray.push(randomIndex);
    }
  }
  return randomArray.map((i) => array[i]);
};

export const getAllCourses = async () => {
  // Moodle courses functionality removed - return empty array
  return [];
};

export const getAllBundles = async () => {
  // Moodle courses functionality removed - return empty array
  return [];
};

// Moodle courses functionality removed - all related functions removed

export const getAllCoursesByPopularity = async () => {
  // Moodle courses functionality removed - return empty array
  return [];
};
