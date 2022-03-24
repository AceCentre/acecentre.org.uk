import styles from "./product-filters.module.css";
import { useState } from "react";
import { Select } from "@chakra-ui/select";
import { useRouter } from "../../lib/useRouter";
import { priceRanges } from "../../lib/products/price-range-consts";
import { ORDER_BY_OPTIONS } from "./order-by-options";
import { PageTitle } from "../page-title/page-title";
import { Input } from "../input/input";
import SvgIcon from "@material-ui/core/SvgIcon";
import SearchIcon from "@material-ui/icons/Search";

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

  const [topLevelCategory, setTopLevelCategory] =
    useState(defaultTopLevelValue);

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
    <>
      <PageTitle heading="Resources" description="Our resources">
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
        </div>
      </div>
    </>
  );
};
