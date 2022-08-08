import { request } from "../data-fetching";

import config from "../config";
import {
  GetAllProductsQuery,
  getImageFromNode,
  getPriceFromNode,
  isInStock,
  isMoodleBundle,
  isMoodleProduct,
} from "./get-products";
import { getMediaNode } from "../utils/get-media-node";
import { gql } from "graphql-request";
import { clientRequest } from "../client-request";
import { getDescriptionFromExcerpt } from "../posts/get-posts";

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
  query GetMyCourses($id: ID!, $customerId: ID!) {
    customer(id: $customerId) {
      email
      orders {
        nodes {
          lineItems {
            nodes {
              product {
                slug
                name
                image {
                  altText
                  sourceUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }

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
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
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

const ENDPOINT = `${config.stellateUrl}`;

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
    customerId: user.customerId,
  });

  if (response.loggedOut) {
    return null;
  }

  const nonMoodleCourses = response.customer.orders.nodes
    .flatMap((order) => {
      return order.lineItems.nodes.flatMap((lineItem) => {
        return lineItem.product;
      });
    })
    .filter((x) => x.slug === "demo-atu")
    .map((product) => {
      return {
        slug: product?.slug || null,
        fullUrl: `https://acecentre.org.uk/learning/${product.slug}`,
        date: {
          title: "External Course",
          tagline: "This course is run externally",
          card: "External Course",
          type: "External Course",
        },
        href: "/test",
        title: product.name,
        image: getMediaNode(product.image),
        featuredImage: getMediaNode(product.image),
        moodleCourseId: 0,
      };
    });

  const moodleCourses = response.user.moodleCourses.nodes
    .map((course) => {
      const product = course.products.nodes[0];
      const mainCategory = getLearningCategoryFromNode(product);

      const image = getImageForCourse(product, course);

      return {
        slug: product?.slug || null,
        date: getDate(course),
        href: "/test",
        title: course.title,
        mainCategoryName: mainCategory.name,
        mainCategory,
        image,
        featuredImage: image,
        moodleCourseId: course?.edwiserMeta?.moodleCourseId || null,
      };
    })
    .sort((productA, productB) => {
      if (
        productA.date.type === "On-demand" &&
        productB.date.type === "On-demand"
      ) {
        return 0;
      }

      if (productA.date.type === "On-demand") {
        return -1;
      }

      if (productB.date.type === "On-demand") {
        return 1;
      }

      const [dayA, monthA, yearA] = productA.date.card.split("/");
      const [dayB, monthB, yearB] = productB.date.card.split("/");

      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);

      return dateA - dateB;
    });

  return [...nonMoodleCourses, ...moodleCourses];
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

export const getAllCourses = async (
  hideOutOfStock = false,
  showAtu = false
) => {
  const queryResponse = await request(ENDPOINT, GetAllProductsQuery);
  const courses = queryResponse.products.nodes.filter((product) => {
    if (product.slug === "demo-atu" && showAtu === false) {
      return false;
    }

    return isMoodleProduct(product);
  });

  const mappedCourses = courses.map(nodeToCourse);

  return mappedCourses.filter((course) => {
    if (hideOutOfStock) {
      return course.inStock;
    }
    return true;
  });
};

export const getAllBundles = async (hideOutOfStock = false) => {
  const queryResponse = await request(ENDPOINT, GetAllProductsQuery);
  const bundles = queryResponse.products.nodes.filter((product) =>
    isMoodleBundle(product)
  );

  const mappedBundle = bundles.map(nodeToBundle);

  return mappedBundle.filter((bundle) => {
    if (hideOutOfStock) {
      return bundle.inStock;
    }
    return true;
  });
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

const getImageForCourse = (node, moodleCourse) => {
  if (moodleCourse && moodleCourse?.featuredImage?.node) {
    return getMediaNode(moodleCourse?.featuredImage?.node);
  }

  if (node?.image) {
    return getMediaNode(node?.image);
  }

  return null;
};

const nodeToBundle = (node) => {
  const productNodes = node.bundled.nodes;
  const courses = productNodes.map(nodeToCourse);

  return {
    fullPrice: courses.reduce((acc, current) => {
      let currentPrice = Number(current.price);

      if (isNaN(currentPrice)) {
        currentPrice = 0;
      }

      return acc + currentPrice;
    }, 0),
    id: node.databaseId,
    slug: node.slug,
    name: node.name,
    title: node.name,
    image: getImageFromNode(node),
    shortDescription: node.shortDescription
      ? getDescriptionFromExcerpt(node.shortDescription)
      : null,
    price: getPriceFromNode(node),
    courses,
    inStock: isInStock(node),
    description: node.description || null,
  };
};

const nodeToCourse = (node) => {
  const mainCategory = getLearningCategoryFromNode(node);

  const moodleCourse = node.moodleCourses.nodes[0] || null;
  const location = LOCATIONS[moodleCourse.meta.location] || null;

  const allowQuantityEditing = node.soldIndividually === true ? false : true;

  const image = getImageForCourse(node, moodleCourse);

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
    image: image,
    featuredImage: image,
    inStock: isInStock(node),
    stockQuantity: node.stockQuantity,
    price: getPriceFromNode(node),
    category: mainCategory,
    mainCategoryName: mainCategory.name,
    mainCategory,
    content: moodleCourse.content.replace(/<p>&nbsp;<\/p>/g, ""),
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
    .split("|")[0]
    .split("-")[0]
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

  const mainCategory = node.productCategories.nodes[0];

  if (mainCategory && mainCategory.name) {
    const description =
      DESCRIPTIONS[mainCategory.slug] || "An Ace Centre Learning course";
    return { name: mainCategory.name, description };
  }

  return defaultCategory;
};

export const getAllCoursesByPopularity = async (hideOutOfStock = false) => {
  const allCourses = await getAllCourses(hideOutOfStock);

  return allCourses.sort((a, b) => b.totalSales - a.totalSales);
};
