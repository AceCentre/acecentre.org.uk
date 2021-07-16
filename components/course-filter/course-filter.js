// import styles from "./course-filter.module.css";

import { PageTitle } from "../page-title/page-title";
import { Input } from "../input/input";
import SvgIcon from "@material-ui/core/SvgIcon";
import SearchIcon from "@material-ui/icons/Search";

export const CourseFilter = () => {
  return (
    <PageTitle heading="Ace Centre Learning" description="Our courses">
      <form onSubmit={() => {}}>
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
