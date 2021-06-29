import { SearchBox } from "../search-box/search-box";

export const BlogSearch = () => {
  return (
    <SearchBox
      title={"Ace Centre blog"}
      description={
        "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore."
      }
      searchEndpoint={"/blog/search"}
      ariaLabel={"Search blog posts"}
      placeholder={"Search the blog"}
      searchButtonText={"Search"}
    />
  );
};
