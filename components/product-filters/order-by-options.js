const alphabetical = (productA, productB) => {
  const nameA = productA.name.toUpperCase();
  const nameB = productB.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

// The first will always be the default
export const ORDER_BY_OPTIONS = [
  {
    slug: "most-popular",
    title: "Most popular",
    sort: (productA, productB) => {
      return productB.totalSales - productA.totalSales;
    },
  },
  {
    slug: "relevant",
    title: "Relevant",
    sort: (productA, productB) => {
      const productAMenuOrder =
        productA.menuOrder == 0 ? 9999 : productA.menuOrder;
      const productBMenuOrder =
        productB.menuOrder == 0 ? 9999 : productB.menuOrder;

      console.log({
        productA: {
          slug: productA.slug,
          original: productA.menuOrder,
          altered: productAMenuOrder,
        },
        productB: {
          slug: productB.slug,
          original: productB.menuOrder,
          altered: productBMenuOrder,
        },
      });

      if (productAMenuOrder == productBMenuOrder) {
        return alphabetical(productA, productA);
      }

      return productAMenuOrder - productBMenuOrder;
    },
  },
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
    sort: alphabetical,
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
];
