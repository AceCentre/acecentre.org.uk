// The first will always be the default
export const ORDER_BY_OPTIONS = [
  {
    slug: "newest",
    title: "Newest",
    sort: (productA, productB) => {
      const dateA = new Date(productA.date);
      const dateB = new Date(productB.date);
      return dateB - dateA;
    },
  },
  {
    slug: "oldest",
    title: "Oldest",
    sort: (productA, productB) => {
      const dateA = new Date(productA.date);
      const dateB = new Date(productB.date);

      return dateA - dateB;
    },
  },
  {
    slug: "alphabetical",
    title: "Alphabetical (A-Z)",
    sort: (productA, productB) => {
      const nameA = productA.name.toUpperCase();
      const nameB = productB.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    },
  },
  {
    slug: "alphabetical-reverse",
    title: "Alphabetical (Z-A)",
    sort: (productA, productB) => {
      const nameA = productA.name.toUpperCase();
      const nameB = productB.name.toUpperCase();
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }

      return 0;
    },
  },
  {
    slug: "price-lowest",
    title: "Price (lowest)",
    sort: (productA, productB) => {
      if (productA.price < productB.price) {
        return -1;
      }
      if (productA.price > productB.price) {
        return 1;
      }

      return 0;
    },
  },
  {
    slug: "price-highest",
    title: "Price (highest)",
    sort: (productA, productB) => {
      if (productA.price < productB.price) {
        return 1;
      }
      if (productA.price > productB.price) {
        return -1;
      }

      return 0;
    },
  },
  {
    slug: "most-popular",
    title: "Most popular",
    sort: (productA, productB) => {
      return productB.totalSales - productA.totalSales;
    },
  },
];
