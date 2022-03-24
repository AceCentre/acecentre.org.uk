import styles from "./course-filter.module.css";

import { PageTitle } from "../page-title/page-title";
import { Input } from "../input/input";
import SvgIcon from "@material-ui/core/SvgIcon";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import { Select } from "@chakra-ui/select";
import { useState } from "react";

const useSearchController = ({
  selectedCategory,
  selectedLevel,
  selectedType,
  selectedLocation,
  selectedPrice,
  selectedOrderBy,
}) => {
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

  const [level, setLevel] = useState(selectedLevel);

  const onChangeLevel = (event) => {
    updateSearchParams({ level: event.target.value });
    setLevel(event.target.value);
  };

  const [type, setType] = useState(selectedType);

  const onChangeType = (event) => {
    updateSearchParams({ type: event.target.value });
    setType(event.target.value);
  };

  const [location, setLocation] = useState(selectedLocation);

  const onChangeLocation = (event) => {
    updateSearchParams({ location: event.target.value });
    setLocation(event.target.value);
  };

  const [price, setPrice] = useState(selectedPrice);

  const onChangePrice = (event) => {
    updateSearchParams({ price: event.target.value });
    setPrice(event.target.value);
  };

  const [orderBy, setOrderBy] = useState(selectedOrderBy);

  const onChangeOrderBy = (event) => {
    updateSearchParams({ orderby: event.target.value });
    setOrderBy(event.target.value);
  };

  return {
    updateSearchParams,
    freeTextOnSubmit,
    categorySelectProps: {
      onChange: onChangeCategory,
      value: category,
    },
    levelSelectProps: {
      onChange: onChangeLevel,
      value: level,
    },
    typeSelectProps: {
      onChange: onChangeType,
      value: type,
    },
    locationSelectProps: {
      onChange: onChangeLocation,
      value: location,
    },
    priceSelectProps: {
      onChange: onChangePrice,
      value: price,
    },
    orderBySelectProps: {
      onChange: onChangeOrderBy,
      value: orderBy,
    },
  };
};

export const CourseFilter = ({
  allCategories,
  allLevels,
  allTypes,
  allLocations,
  allPrices,
  allOrderBy,
  selectedType = null,
  selectedCategory = null,
  selectedLevel = null,
  selectedLocation = null,
  selectedPrice = null,
  selectedOrderBy = null,
  courseCount = 0,
  searchText,
}) => {
  const {
    freeTextOnSubmit,
    categorySelectProps,
    levelSelectProps,
    typeSelectProps,
    locationSelectProps,
    priceSelectProps,
    orderBySelectProps,
  } = useSearchController({
    selectedCategory,
    selectedLevel,
    selectedType,
    selectedLocation,
    selectedPrice,
    selectedOrderBy,
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
            <button
              type="submit"
              className={styles.noStyleButton}
              aria-label="Search"
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
            maxWidth={["100%", "100%", 160]}
            borderRadius={25}
            backgroundColor="#F5F5F5"
            {...categorySelectProps}
            placeholder="Category"
            aria-label="Category"
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
          <Select
            maxWidth={["100%", "100%", 160]}
            borderRadius={25}
            backgroundColor="#F5F5F5"
            {...levelSelectProps}
            placeholder="Level"
            aria-label="Level"
          >
            {allLevels.map((level) => {
              return (
                <option value={level.toLowerCase()} key={`level-${level}`}>
                  {level}
                </option>
              );
            })}
          </Select>
          <Select
            maxWidth={["100%", "100%", 160]}
            borderRadius={25}
            backgroundColor="#F5F5F5"
            {...typeSelectProps}
            placeholder="Type"
            aria-label="Type"
          >
            {allTypes.map((type) => {
              return (
                <option value={type.toLowerCase()} key={`type-${type}`}>
                  {type}
                </option>
              );
            })}
          </Select>
          <Select
            maxWidth={["100%", "100%", 160]}
            borderRadius={25}
            backgroundColor="#F5F5F5"
            {...locationSelectProps}
            placeholder="Location"
            aria-label="Location"
          >
            {allLocations.map((location) => {
              return (
                <option value={location.slug} key={`location-${location.slug}`}>
                  {location.title}
                </option>
              );
            })}
          </Select>
          <Select
            maxWidth={["100%", "100%", 160]}
            borderRadius={25}
            backgroundColor="#F5F5F5"
            {...priceSelectProps}
            placeholder="Price"
            aria-label="Price"
          >
            {allPrices.map((price) => {
              return (
                <option value={price.slug} key={`price-${price.slug}`}>
                  {price.name}
                </option>
              );
            })}
          </Select>
        </div>
        <div className={styles.orderByArea}>
          <p>{`${courseCount} courses`}</p>
          <Select
            width={"50%"}
            maxWidth={220}
            className={styles.orderBySelect}
            variant="unstyled"
            {...orderBySelectProps}
            placeholder="Order By"
            aria-label="Order by"
          >
            {allOrderBy.map((orderBy) => {
              return (
                <option value={orderBy.slug} key={`orderBy-${orderBy.slug}`}>
                  {orderBy.name}
                </option>
              );
            })}
          </Select>
        </div>
      </div>
    </>
  );
};
