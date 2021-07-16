import { request } from "../data-fetching";

import config from "../config";
import {
  GetAllProductsQuery,
  getPriceFromNode,
  isInStock,
  isMoodleProduct,
} from "./get-products";
import { getMediaNode } from "../utils/get-media-node";
import { gql } from "graphql-request";

const GetAllReviews = gql`
  query GetAllTestimonials {
    testimonials(first: 1000) {
      nodes {
        slug
        content
      }
    }
  }
`;

const ENDPOINT = `${config.baseUrl}/graphql`;

export const getRandomReviews = async () => {
  const response = await request(ENDPOINT, GetAllReviews);

  return getRandomElementsFromArray(response.testimonials.nodes);
};

const getRandomElementsFromArray = (array, count = 5) => {
  const randomArray = [];
  while (randomArray.length < count) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (randomArray.indexOf(randomIndex) === -1) {
      randomArray.push(randomIndex);
    }
  }
  return randomArray.map((i) => array[i]);
};

export const getAllCourses = async () => {
  const queryResponse = await request(ENDPOINT, GetAllProductsQuery);
  const courses = queryResponse.products.nodes.filter((product) =>
    isMoodleProduct(product)
  );

  const mappedCourses = courses.map(nodeToCourse);

  return mappedCourses;
};

export const LOCATIONS = {
  online: {
    title: "Online course",
    tagline: "Take this course online",
    slug: "online",
  },
  north: {
    title: "Oldham Office",
    tagline: "Take this course in person",
    slug: "north",
  },
  south: {
    title: "Abingdon Office",
    tagline: "Take this course in person",
    slug: "south",
  },
};

const nodeToCourse = (node) => {
  const mainCategory = getLearningCategoryFromNode(node);

  const moodleCourse = node.moodleCourses.nodes[0] || null;
  const location = LOCATIONS[moodleCourse.meta.location] || null;

  const course = {
    slug: node.slug,
    id: node.databaseId,
    title: node.name,
    name: node.name,
    featured: node.featured,
    totalSales: node.totalSales,
    description: node.description,
    shortDescription: node.shortDescription,
    image: getMediaNode(node.image),
    featuredImage: getMediaNode(node.image),
    inStock: isInStock(node),
    price: getPriceFromNode(node),
    category: mainCategory,
    mainCategoryName: mainCategory.name,
    mainCategory,
    content: moodleCourse.content,
    location,
    level: getLevel(moodleCourse),
    date: getDate(moodleCourse),
  };

  return course;
};

const getLevel = (moodleCourse) => {
  if (!moodleCourse) return null;
  if (!moodleCourse.meta) return null;
  if (!moodleCourse.meta.courseLevel) return null;
  if (moodleCourse.meta.courseLevel.length < 1) return null;

  const levelSlug = moodleCourse.meta.courseLevel[0].slug;

  return toTitleCase(levelSlug);
};

const toTitleCase = (level = "") => {
  return level.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

const getDate = (moodleCourse) => {
  const date = moodleCourse?.meta.date || null;
  const dateSpecific = moodleCourse.meta?.dateSpecific || false;

  if (!dateSpecific || !date) {
    return {
      title: "On-demand course",
      tagline: "Take this course whenever you like.",
      card: "ON-DEMAND",
      type: "On-demand",
    };
  }

  return {
    title: "Runs on specific date",
    tagline: date,
    card: date,
    type: "Scheduled",
  };
};

const DESCRIPTIONS = {
  education: "Exploring ways to support written communication and learning.",
  communication:
    "Exploring Augmentative and Alternative Communication (AAC) that supports face-to-face communication.",
  access:
    "Exploring access and control of technology using adaptations to standard equipment.",
};

const getLearningCategoryFromNode = (node) => {
  const defaultCategory = {
    name: "Course",
    description: "An Ace Centre Learning course",
  };

  if (!node) return defaultCategory;
  if (!node.productCategories) return defaultCategory;
  if (!node.productCategories.nodes) return defaultCategory;
  if (node.productCategories.nodes.length === 0) return defaultCategory;
  if (node.productCategories.nodes.length > 1) return defaultCategory;

  const mainCategory = node.productCategories.nodes[0];

  if (mainCategory && mainCategory.name) {
    const description =
      DESCRIPTIONS[mainCategory.slug] || "An Ace Centre Learning course";
    return { name: mainCategory.name, description };
  }

  return defaultCategory;
};

export const getAllCoursesByPopularity = async () => {
  const allCourses = await getAllCourses();

  return allCourses.sort((a, b) => b.totalSales - a.totalSales);
};
