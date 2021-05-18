import { SearchBox } from "../search-box/search-box";

export const ProjectsSearch = () => {
  return (
    <SearchBox
      title={"Research projects"}
      description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
  gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
  pellentesque.`}
      searchEndpoint={"/research/search"}
      ariaLabel={"Search research projects"}
      placeholder={"What are you looking for?"}
      searchButtonText={"Search"}
    />
  );
};
