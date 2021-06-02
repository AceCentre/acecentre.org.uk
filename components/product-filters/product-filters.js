import styles from "./product-filters.module.css";
import { useState } from "react";
import { Select } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const useSelect = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { onChange, value };
};

const useSearchController = () => {
  const { query, push: pushNewUrl } = useRouter();

  const updateSearchParams = (newParams) => {
    const newQuery = { ...query, ...newParams, page: 1 };
    const queryStringPairs = [];

    for (const [key, value] of Object.entries(newQuery)) {
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

  return {
    updateSearchParams,
    freeTextOnSubmit,
  };
};

export const ProductFilters = ({
  categories,
  selectedCategory = "",
  selectedSubCategory = "",
  resourceCount = 0,
  searchText = "",
}) => {
  const { freeTextOnSubmit } = useSearchController();

  const categorySelectProps = useSelect(selectedCategory);
  const selectedCategoryFull =
    categories.find(
      (category) => category.slug === categorySelectProps.value
    ) || {};
  const currentSubCategories = selectedCategoryFull.subcategories || [];
  const subcategorySelectProps = useSelect(selectedSubCategory);

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
        <Select {...categorySelectProps} placeholder="Select category">
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
