import { SearchBox } from "../search-box/search-box";

export const ProjectsSearch = () => {
  return (
    <SearchBox
      title={"Projects"}
      description={
        "Directly enhancing achievements and good practice through the development of AT and AAC"
      }
      searchEndpoint={"/projects/search"}
      ariaLabel={"Search research projects"}
      placeholder={"Search our projects"}
      searchButtonText={"Search"}
    />
  );
};
