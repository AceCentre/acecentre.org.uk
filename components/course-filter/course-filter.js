// import styles from "./course-filter.module.css";

import { PageTitle } from "../page-title/page-title";
import { Input } from "../input/input";
import SvgIcon from "@material-ui/core/SvgIcon";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";

const useSearchController = () => {
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

  return {
    updateSearchParams,
    freeTextOnSubmit,
  };
};

export const CourseFilter = () => {
  const { freeTextOnSubmit } = useSearchController();

  return (
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
  );
};
