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
import { clientRequest } from "../client-request";

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

const GetCourseCount = gql`
  query GetCourseCount($id: ID!) {
    user(id: $id) {
      name
      moodleCourses(first: 1000) {
        nodes {
          id
          title
          date
        }
      }
    }
  }
`;

const GetMyCourses = gql`
  query GetMyCourses($id: ID!) {
    user(id: $id) {
      name
      moodleCourses(first: 1000) {
        nodes {
          id
          title
          content
          edwiserMeta {
            moodleCourseId
          }
          meta {
            location
            date
            dateSpecific
            courseLevel {
              name
              slug
              id
            }
          }
          products {
            nodes {
              id
              slug
              name
              totalSales
              featured
              shortDescription
              description
              date
              name
              image {
                altText
                mediaDetails {
                  width
                  height
                }
                sourceUrl
              }
              galleryImages {
                nodes {
                  altText
                  mediaDetails {
                    width
                    height
                  }
                  sourceUrl
                }
              }
              ... on SimpleProduct {
                price(format: RAW)
                downloadable
                stockStatus
                stockQuantity
                databaseId
              }
              ... on ExternalProduct {
                price(format: RAW)
                databaseId
                externalUrl
                buttonText
              }
              ... on VariableProduct {
                databaseId
                variations {
                  nodes {
                    name
                    id
                    slug
                    price(format: RAW)
                    totalSales
                    downloadable
                    stockStatus
                    stockQuantity
                    databaseId
                  }
                }
              }
              productCategories {
                nodes {
                  name
                  slug
                  parent {
                    node {
                      name
                      parent {
                        node {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ENDPOINT = `${config.baseUrl}/graphql`;

export const getCourseCount = async (req, user) => {
  const response = await clientRequest(req, GetCourseCount, {
    id: user.userId,
  });

  if (response.loggedOut) {
    return null;
  }

  if (
    response &&
    response.user &&
    response.user.moodleCourses &&
    response.user.moodleCourses.nodes
  ) {
    return response.user.moodleCourses.nodes.length;
  }

  return 0;
};

export const getMyCourses = async (req, user) => {
  const response = await clientRequest(req, GetMyCourses, {
    id: user.userId,
  });

  if (response.loggedOut) {
    return null;
  }

  return response.user.moodleCourses.nodes.map((course) => {
    const product = course.products.nodes[0];
    const mainCategory = getLearningCategoryFromNode(product);

    return {
      slug: product?.slug || null,
      date: getDate(course),
      href: "/test",
      title: course.title,
      mainCategoryName: mainCategory.name,
      mainCategory,
      image: getMediaNode(product?.image),
      featuredImage: getMediaNode(product?.image),
      moodleCourseId: course?.edwiserMeta?.moodleCourseId || null,
    };
  });
};

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
  webinar: {
    title: "Webinar",
    tagline: "Join this webinar online",
    slug: "webinar",
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

  const allowQuantityEditing = node.soldIndividually === true ? false : true;

  const course = {
    groupPurchase: node.courseGroupPurchase,
    allowQuantityEditing,
    slug: node.slug,
    id: node.databaseId,
    title: nameToTitle(moodleCourse.title),
    name: nameToTitle(moodleCourse.title),
    featured: node.featured,
    totalSales: node.totalSales,
    description: moodleCourse.meta.shortDesc,
    shortDescription: moodleCourse.meta.shortDesc,
    image: getMediaNode(moodleCourse.featuredImage?.node),
    featuredImage: getMediaNode(moodleCourse.featuredImage?.node),
    inStock: isInStock(node),
    stockQuantity: node.stockQuantity,
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

const nameToTitle = (name) => {
  return name
    .split("(D)")[0]
    .split("(I)")[0]
    .split("(E)")[0]
    .split("(S)")[0]
    .trim();
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
