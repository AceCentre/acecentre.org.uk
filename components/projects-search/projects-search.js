import { SearchBox } from "../search-box/search-box";

export const ProjectsSearch = () => {
  return (
    <SearchBox
      title={"Projects"}
      description={
        "Research projects enhance achievement and good practice in the field; directly, through the development of AT &  AAC"
      }
      searchEndpoint={"/projects/search"}
      ariaLabel={"Search research projects"}
      placeholder={"Search our projects"}
      searchButtonText={"Search"}
    />
  );
};
