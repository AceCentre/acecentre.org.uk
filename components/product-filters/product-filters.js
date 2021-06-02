import styles from "./product-filters.module.css";
import { useState } from "react";
import { Select } from "@chakra-ui/react";
import Link from "next/link";

const useSelect = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { onChange, value };
};

export const ProductFilters = ({
  categories,
  selectedCategory = "",
  selectedSubCategory = "",
}) => {
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
        <div className={styles.searchBox}>
          <input
            name="searchText"
            type="text"
            placeholder="What are you looking for?"
          />
          <button type="submit">Search</button>
        </div>
      </div>
      <div className={styles.subHeader}>
        <h2>Filter Products</h2>
        <Link href="/resources/all">
          <a className={styles.resetLink}>Reset filters</a>
        </Link>
      </div>
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
    </div>
  );
};
