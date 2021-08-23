import { SearchBox } from "../search-box/search-box";

export const BlogSearch = () => {
  return (
    <SearchBox
      title={"Ace Centre blog"}
      description={
        "Keep up to date with news on what we're up to and how you can get involved"
      }
      searchEndpoint={"/blog/search"}
      ariaLabel={"Search blog posts"}
      placeholder={"Search the blog"}
      searchButtonText={"Search"}
    />
  );
};
