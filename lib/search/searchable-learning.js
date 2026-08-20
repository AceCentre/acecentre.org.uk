import Fuse from "fuse.js";

export const SEARCHABLE_LEARNING = [
  {
    title: "Ace Centre Learning",
    href: "/learning",
    description:
      "Ace Centre Learning offers training opportunities for Assistive Technology and AAC, including live courses, on-demand learning, bespoke training, and specialist modules.",
    keywords: [
      "learn",
      "learning",
      "training",
      "bespoke",
      "course",
      "courses",
      "aac module",
      "assistive technology unit",
      "access module",
    ],
    featuredImage: {
      src: "/services/learning.jpeg",
      alt: "Ace Centre Learning",
    },
  },
];

export const searchLearning = (searchText, limit = 4) => {
  if (!searchText) return [];

  const fuse = new Fuse(SEARCHABLE_LEARNING, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "keywords", weight: 0.3 },
      { name: "description", weight: 0.2 },
    ],
    threshold: 0.4,
    ignoreLocation: true,
  });

  return fuse
    .search(searchText)
    .map((result) => result.item)
    .slice(0, limit);
};
