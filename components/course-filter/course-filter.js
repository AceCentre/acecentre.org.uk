import styles from "./course-filter.module.css";

import { PageTitle } from "../page-title/page-title";
import { Input } from "../input/input";
import SvgIcon from "@material-ui/core/SvgIcon";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import { Select } from "@chakra-ui/react";
import { useState } from "react";

const useSearchController = ({ selectedCategory }) => {
  const { query, push: pushNewUrl } = useRouter();

  const updateSearchParams = (newParams) => {
    const newQuery = { ...query, ...newParams };
    const queryStringPairs = [];

    for (const [key, value] of Object.entries(newQuery)) {
      if (value === null) continue;
      if (value === "") continue;

      queryStringPairs.push(`${key}=${value}`);
    }

    const newQueryString = queryStringPairs.join("&");

    pushNewUrl(`/learning/search?${newQueryString}`);
  };

  const freeTextOnSubmit = (event) => {
    event.preventDefault();
    const searchText = event.target["searchText"].value;
    if (!searchText) return;
    updateSearchParams({ searchText });
  };

  const [category, setCategory] = useState(selectedCategory);

  const onChangeCategory = (event) => {
    updateSearchParams({ category: event.target.value });
    setCategory(event.target.value);
  };

  return {
    updateSearchParams,
    freeTextOnSubmit,
    categorySelectProps: {
      onChange: onChangeCategory,
      value: category,
    },
  };
};

export const CourseFilter = ({ allCategories, selectedCategory }) => {
  const { freeTextOnSubmit, categorySelectProps } = useSearchController({
    selectedCategory,
  });

  return (
    <>
      <PageTitle heading="Ace Centre Learning" description="Our courses">
        <form onSubmit={freeTextOnSubmit}>
          <Input
            name="searchText"
            white
            placeholder="What do you want to learn?"
            ariaLabel="Search courses"
          >
            <SvgIcon>
              <SearchIcon />
            </SvgIcon>
          </Input>
        </form>
      </PageTitle>

      <div className={styles.selectContainer}>
        <Select
          maxWidth={["100%", "100%", 160]}
          borderRadius={25}
          backgroundColor="#F5F5F5"
          {...categorySelectProps}
          placeholder="Category"
        >
          {allCategories.map((category) => {
            return (
              <option
                value={category.name.toLowerCase()}
                key={`category-${category.name}`}
              >
                {category.name}
              </option>
            );
          })}
        </Select>
      </div>
    </>
  );
};
