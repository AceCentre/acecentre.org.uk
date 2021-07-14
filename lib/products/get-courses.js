import { request } from "../data-fetching";

import config from "../config";
import {
  GetAllProductsQuery,
  getPriceFromNode,
  isInStock,
  isMoodleProduct,
} from "./get-products";
import { getMediaNode } from "../utils/get-media-node";

const ENDPOINT = `${config.baseUrl}/graphql`;

export const getAllCourses = async () => {
  const queryResponse = await request(ENDPOINT, GetAllProductsQuery);
  const courses = queryResponse.products.nodes.filter((product) =>
    isMoodleProduct(product)
  );

  const mappedCourses = courses.map(nodeToCourse);

  return mappedCourses;
};

const nodeToCourse = (node) => {
  const mainCategory = getLearningCategoryFromNode(node);

  const content = node.moodleCourses.nodes[0].content;

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
    content,
  };

  return course;
};

const getLearningCategoryFromNode = (node) => {
  const defaultCategory = {
    name: "Course",
  };

  if (!node) return defaultCategory;
  if (!node.productCategories) return defaultCategory;
  if (!node.productCategories.nodes) return defaultCategory;
  if (node.productCategories.nodes.length === 0) return defaultCategory;
  if (node.productCategories.nodes.length > 1) return defaultCategory;

  const mainCategory = node.productCategories.nodes[0];

  if (mainCategory && mainCategory.name) {
    return { name: mainCategory.name };
  }

  return defaultCategory;
};

export const getAllCoursesByPopularity = async () => {
  const allCourses = await getAllCourses();

  return allCourses.sort((a, b) => b.totalSales - a.totalSales);
};
