import styles from "./product-filters.module.css";
import { useState } from "react";
import { Select } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const priceRanges = [
  {
    slug: "1",
    name: "tests",
  },
];

const useSearchController = ({
  defaultTopLevelValue,
  defaultSubcategoryValue,
  defaultPriceRange,
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
    updateSearchParams({ priceRange: event.target.value });
    setPriceRange(event.target.value);
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
  };
};

export const ProductFilters = ({
  categories,
  selectedCategory = "",
  selectedSubCategory = "",
  selectedPriceRange = "",
  resourceCount = 0,
  searchText = "",
}) => {
  const {
    freeTextOnSubmit,
    topLevelCategorySelectProps,
    subcategorySelectProps,
    priceRangeSelectProps,
  } = useSearchController({
    defaultTopLevelValue: selectedCategory,
    defaultSubcategoryValue: selectedSubCategory,
    defaultPriceRangeValue: selectedPriceRange,
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
        <Link href="/resources/all">
          <a className={styles.resetLink}>Reset filters</a>
        </Link>
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
      </div>
    </div>
  );
};
