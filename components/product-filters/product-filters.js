import styles from "./product-filters.module.css";
import { useState } from "react";
import { Select } from "@chakra-ui/react";
import { useRouter } from "../../lib/useRouter";
import { priceRanges } from "../../lib/products/price-range-consts";

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
];

const useSearchController = ({
  defaultTopLevelValue,
  defaultSubcategoryValue,
  defaultPriceRange,
  defaultOrderBy,
}) => {
  const { query, push: pushNewUrl } = useRouter();

  const updateSearchParams = (newParams) => {
    const newQuery = { ...query, ...newParams, page: 1 };
    const queryStringPairs = [];

    for (const [key, value] of Object.entries(newQuery)) {
      if (value === null) continue;
      if (value === "") continue;

      queryStringPairs.push(`${key}=${value}`);
    }

    const newQueryString = queryStringPairs.join("&");

    pushNewUrl(`/resources/all?${newQueryString}`);
  };

  const freeTextOnSubmit = (event) => {
    event.preventDefault();
    const searchText = event.target["searchText"].value;
    if (!searchText) return;
    updateSearchParams({ searchText });
  };

  const [topLevelCategory, setTopLevelCategory] = useState(
    defaultTopLevelValue
  );

  const onChangeTopLevelCategory = (event) => {
    updateSearchParams({ category: event.target.value, subcategory: null });
    setTopLevelCategory(event.target.value);
  };

  const [subcategory, setSubcategory] = useState(defaultSubcategoryValue);

  const onChangeSubcategory = (event) => {
    updateSearchParams({ subcategory: event.target.value });
    setSubcategory(event.target.value);
  };

  const [priceRange, setPriceRange] = useState(defaultPriceRange);

  const onChangePriceRange = (event) => {
    updateSearchParams({ pricerange: event.target.value });
    setPriceRange(event.target.value);
  };

  const [orderByValue, setOrderByValue] = useState(
    defaultOrderBy || ORDER_BY_OPTIONS[0].slug
  );

  const onChangeOrderBy = (event) => {
    updateSearchParams({ orderby: event.target.value });
    setOrderByValue(event.target.value);
  };

  return {
    updateSearchParams,
    freeTextOnSubmit,
    topLevelCategorySelectProps: {
      onChange: onChangeTopLevelCategory,
      value: topLevelCategory,
    },
    subcategorySelectProps: {
      onChange: onChangeSubcategory,
      value: subcategory,
    },
    priceRangeSelectProps: {
      onChange: onChangePriceRange,
      value: priceRange,
    },
    orderByProps: {
      onChange: onChangeOrderBy,
      value: orderByValue,
    },
  };
};

export const ProductFilters = ({
  categories,
  selectedCategory = "",
  selectedSubCategory = "",
  selectedPriceRange = "",
  resourceCount = 0,
  searchText = "",
  selectedOrderBy = null,
}) => {
  const {
    freeTextOnSubmit,
    topLevelCategorySelectProps,
    subcategorySelectProps,
    priceRangeSelectProps,
    orderByProps,
  } = useSearchController({
    defaultTopLevelValue: selectedCategory,
    defaultSubcategoryValue: selectedSubCategory,
    defaultPriceRangeValue: selectedPriceRange,
    defaultOrderBy: selectedOrderBy,
  });

  const selectedCategoryFull =
    categories.find(
      (category) => category.slug === topLevelCategorySelectProps.value
    ) || {};
  const currentSubCategories = selectedCategoryFull.subcategories || [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Resources</h1>
        <form onSubmit={freeTextOnSubmit} className={styles.searchBox}>
          <input
            name="searchText"
            type="text"
            placeholder="What are you looking for?"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className={styles.subHeader}>
        <h2>Filter Products</h2>
        <a href="/resources/all" className={styles.resetLink}>
          Reset filters
        </a>
      </div>
      {searchText && <p>{`You searched for: "${searchText}"`}</p>}
      <div className={styles.selectContainer}>
        <Select {...topLevelCategorySelectProps} placeholder="Select category">
          {categories.map((category) => {
            return (
              <option value={category.slug} key={category.slug}>
                {category.name}
              </option>
            );
          })}
        </Select>
        <Select
          disabled={currentSubCategories.length === 0}
          {...subcategorySelectProps}
          placeholder="Select sub-category"
        >
          {currentSubCategories.map((category) => {
            return (
              <option value={category.slug} key={category.slug}>
                {category.name}
              </option>
            );
          })}
        </Select>
        <Select {...priceRangeSelectProps} placeholder="Select price range">
          {priceRanges.map((priceRange) => {
            return (
              <option value={priceRange.slug} key={priceRange.slug}>
                {priceRange.name}
              </option>
            );
          })}
        </Select>
      </div>
      <div className={styles.orderByArea}>
        <p>{`${resourceCount} resources`}</p>
        <Select
          width={"50%"}
          maxWidth={200}
          className={styles.orderBySelect}
          variant="unstyled"
          {...orderByProps}
        >
          {ORDER_BY_OPTIONS.map((orderBy) => {
            return (
              <option value={orderBy.slug} key={orderBy.slug}>
                {orderBy.title}
              </option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};
