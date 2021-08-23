import { SearchBox } from "../search-box/search-box";

export const ResourcesSearch = () => {
  return (
    <SearchBox
      title={"Resources"}
      description={
        "Discover a wide range of resources, publications and downloads to support use and implementation of AAC and AT"
      }
      searchEndpoint={"/resources/all"}
      ariaLabel={"Search resources"}
      placeholder={"Search for resources"}
      searchButtonText={"Search"}
      backgroundColor="#F6EEC5"
      backgroundImage="yellow-wave.svg"
      textColor="#333333"
    />
  );
};
