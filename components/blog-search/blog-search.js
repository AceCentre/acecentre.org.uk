import { SearchBox } from "../search-box/search-box";

export const BlogSearch = () => {
  return (
    <SearchBox
      title={"Blog"}
      description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
  gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
  pellentesque.`}
      searchEndpoint={"/blog/search"}
      ariaLabel={"Search blog posts"}
      placeholder={"What are you looking for?"}
      searchButtonText={"Search"}
    />
  );
};
