import styles from "./product-filters.module.css";
import { useState, useEffect } from "react";
import { Select } from "@chakra-ui/select";
import { priceRanges } from "../../lib/products/price-range-consts";
import { ORDER_BY_OPTIONS } from "./order-by-options";
import { PageTitle } from "../page-title/page-title";
import { Input } from "../input/input";
import SvgIcon from "@mui/material/SvgIcon";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

const useSearchController = ({
  defaultTopLevelValue,
  defaultSubcategoryValue,
  defaultPriceRange,
  defaultOrderBy,
}) => {
  const { query, push: pushNewUrl } = useRouter();

  // Maintain local state for all filter values to avoid race conditions
  const [topLevelCategory, setTopLevelCategory] = useState(defaultTopLevelValue);
  const [subcategory, setSubcategory] = useState(defaultSubcategoryValue);
  const [priceRange, setPriceRange] = useState(defaultPriceRange);
  const [orderByValue, setOrderByValue] = useState(
    defaultOrderBy || ORDER_BY_OPTIONS[0].slug
  );

  // Sync local state with router query when it changes (e.g., direct navigation)
  useEffect(() => {
    if (query.category !== undefined && query.category !== topLevelCategory) {
      setTopLevelCategory(query.category || "");
    }
    if (query.subcategory !== undefined && query.subcategory !== subcategory) {
      setSubcategory(query.subcategory || "");
    }
    if (query.pricerange !== undefined && query.pricerange !== priceRange) {
      setPriceRange(query.pricerange || "");
    }
    if (query.orderby !== undefined && query.orderby !== orderByValue) {
      setOrderByValue(query.orderby || ORDER_BY_OPTIONS[0].slug);
    }
  }, [query.category, query.subcategory, query.pricerange, query.orderby]);

  const updateSearchParams = (newParams, currentState = {}) => {
    // Use provided currentState or fall back to local state values
    // This ensures that when one filter changes, we preserve the values of other filters
    const stateValues = {
      category: currentState.category ?? topLevelCategory ?? null,
      subcategory: currentState.subcategory ?? subcategory ?? null,
      pricerange: currentState.pricerange ?? priceRange ?? null,
      orderby: currentState.orderby ?? orderByValue ?? null,
    };
    
    const currentQuery = {
      ...query, // Keep other query params like searchText
      ...stateValues,
      ...newParams, // Override with new params
      page: 1,
    };
    
    const queryStringPairs = [];

    for (const [key, value] of Object.entries(currentQuery)) {
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

  const onChangeTopLevelCategory = (event) => {
    const newCategory = event.target.value;
    setTopLevelCategory(newCategory);
    setSubcategory(""); // Clear subcategory when category changes
    updateSearchParams(
      { category: newCategory, subcategory: null },
      { category: newCategory, subcategory: "", pricerange: priceRange, orderby: orderByValue }
    );
  };

  const onChangeSubcategory = (event) => {
    const newSubcategory = event.target.value;
    setSubcategory(newSubcategory);
    updateSearchParams(
      { subcategory: newSubcategory },
      { category: topLevelCategory, subcategory: newSubcategory, pricerange: priceRange, orderby: orderByValue }
    );
  };

  const onChangePriceRange = (event) => {
    const newPriceRange = event.target.value;
    setPriceRange(newPriceRange);
    updateSearchParams(
      { pricerange: newPriceRange },
      { category: topLevelCategory, subcategory: subcategory, pricerange: newPriceRange, orderby: orderByValue }
    );
  };

  const onChangeOrderBy = (event) => {
    const newOrderBy = event.target.value;
    setOrderByValue(newOrderBy);
    updateSearchParams(
      { orderby: newOrderBy },
      { category: topLevelCategory, subcategory: subcategory, pricerange: priceRange, orderby: newOrderBy }
    );
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
  selectedCategoryDesc = "",
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
    defaultPriceRange: selectedPriceRange,
    defaultOrderBy: selectedOrderBy,
  });

  const selectedCategoryFull =
    categories.find(
      (category) => category.slug === topLevelCategorySelectProps.value
    ) || {};
  const currentSubCategories = selectedCategoryFull.subcategories || [];

  return (
    <>
      <PageTitle
        heading="Resources"
        description="Our resources"
        className={`${selectedCategoryDesc ? styles.pageTitle : ""}`}
      >
        <form onSubmit={freeTextOnSubmit}>
          <Input
            name="searchText"
            white
            placeholder="Search for resources"
            ariaLabel="Search resources"
          >
            <button
              aria-label="Search"
              type="submit"
              className={styles.noStyleButton}
            >
              <SvgIcon>
                <SearchIcon />
              </SvgIcon>
            </button>
          </Input>
        </form>
      </PageTitle>
      {selectedCategoryDesc && (
        <div className={styles.container}>
          <p>{selectedCategoryDesc}</p>
        </div>
      )}

      <div className={styles.container}>
        {searchText && <p>{`You searched for: "${searchText}"`}</p>}
        <div className={styles.selectContainer}>
          <Select
            borderRadius={25}
            maxWidth={["100%", "100%", 150]}
            backgroundColor="#F5F5F5"
            {...topLevelCategorySelectProps}
            placeholder="Category"
            aria-label="Category"
          >
            {categories.map((category) => {
              return (
                <option value={category.slug} key={`category-${category.slug}`}>
                  {category.name}
                </option>
              );
            })}
          </Select>
          <Select
            maxWidth={["100%", "100%", 150]}
            borderRadius={25}
            backgroundColor="#F5F5F5"
            disabled={currentSubCategories.length === 0}
            {...subcategorySelectProps}
            placeholder="Sub-category"
            aria-label="Sub-category"
          >
            {currentSubCategories.map((category) => {
              return (
                <option
                  value={category.slug}
                  key={`subcategory-${category.slug}`}
                >
                  {category.name}
                </option>
              );
            })}
          </Select>
          <Select
            maxWidth={["100%", "100%", 150]}
            borderRadius={25}
            backgroundColor="#F5F5F5"
            {...priceRangeSelectProps}
            placeholder="Price range"
            aria-label="Price range"
          >
            {priceRanges.map((priceRange) => {
              return (
                <option
                  value={priceRange.slug}
                  key={`priceRange-${priceRange.slug}`}
                >
                  {priceRange.name}
                </option>
              );
            })}
          </Select>
        </div>
        <div className={styles.orderByArea}>
          <p>{`${resourceCount} resources`}</p>
          {searchText ? (
            <Select
              width={"50%"}
              maxWidth={160}
              className={styles.orderBySelect}
              variant="unstyled"
              aria-label="Sort by"
              value="relevance"
              disabled
            >
              <option value="relevance">Relevance</option>
            </Select>
          ) : (
            <Select
              width={"50%"}
              maxWidth={160}
              className={styles.orderBySelect}
              variant="unstyled"
              aria-label="Sort by"
              {...orderByProps}
            >
              {ORDER_BY_OPTIONS.map((orderBy) => {
                return (
                  <option value={orderBy.slug} key={`orderBy-${orderBy.slug}`}>
                    {orderBy.title}
                  </option>
                );
              })}
            </Select>
          )}
        </div>
      </div>
    </>
  );
};
