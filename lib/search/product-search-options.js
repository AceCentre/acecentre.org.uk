export const PRODUCT_SEARCH_KEYS = [
  { name: "name", weight: 0.7 },
  { name: "categoryNames", weight: 0.5 },
  { name: "tagNames", weight: 0.7 },
  { name: "description", weight: 0.3 },
  { name: "shortDescription", weight: 0.3 },
];

export const PRODUCT_SEARCH_OPTIONS = {
  keys: PRODUCT_SEARCH_KEYS,
  ignoreLocation: true,
  includeScore: true,
};
