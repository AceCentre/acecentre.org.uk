export const POST_SEARCH_KEYS = [
  { name: "title", weight: 0.7 },
  { name: "categoryNames", weight: 0.5 },
  { name: "tagNames", weight: 0.7 },
  { name: "content", weight: 0.3 },
];

export const POST_SEARCH_OPTIONS = {
  keys: POST_SEARCH_KEYS,
  ignoreLocation: true,
};
