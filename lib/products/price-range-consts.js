export const priceRanges = [
  {
    slug: "0",
    name: "Free",
    min: 0,
    max: 0,
  },
  {
    slug: "<10",
    name: "Less than £10",
    min: 0.01,
    max: 10,
  },
  {
    slug: ">10",
    name: "More than £10",
    min: 10.01,
    max: 999999,
  },
];
