import { SearchBox } from "../search-box/search-box";

export const ResourcesSearch = () => {
  return (
    <SearchBox
      title={"Resources"}
      description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
  gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
  pellentesque.`}
      searchEndpoint={"/resources/search"}
      ariaLabel={"Search resources"}
      placeholder={"What are you looking for?"}
      searchButtonText={"Search"}
    />
  );
};
