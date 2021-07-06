import { SearchBox } from "../search-box/search-box";

export const ResourcesSearch = () => {
  return (
    <SearchBox
      title={"Resources"}
      description={
        "Get started with AAC, Free Symbol & Alphabet charts  for download"
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
