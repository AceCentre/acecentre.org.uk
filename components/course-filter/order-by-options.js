// The first will always be the default
export const ORDER_BY_OPTIONS = [
  {
    slug: "first",
    name: "Scheduled Date (first)",
    sort: (productA, productB) => {
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
    },
  },
  {
    slug: "last",
    name: "Scheduled Date (last)",
    sort: (productA, productB) => {
      if (
        productA.date.type === "On-demand" &&
        productB.date.type === "On-demand"
      ) {
        return 0;
      }

      if (productA.date.type === "On-demand") {
        return 1;
      }

      if (productB.date.type === "On-demand") {
        return -1;
      }

      const [dayA, monthA, yearA] = productA.date.card.split("/");
      const [dayB, monthB, yearB] = productB.date.card.split("/");

      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);

      return dateB - dateA;
    },
  },
  {
    slug: "alphabetical",
    name: "Alphabetical (A-Z)",
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
    name: "Alphabetical (Z-A)",
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
    name: "Price (lowest)",
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
    name: "Price (highest)",
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
];
