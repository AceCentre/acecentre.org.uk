import { SearchBox } from "../search-box/search-box";

export const LearningSearch = () => {
  return (
    <SearchBox
      title={"Ace Centre Learning"}
      description={
        "Ace Centre Learning offers a wide range of training opportunities for Assistive Technology (AT), including Alternative & Augmentative Communication solutions (AAC) across four key areas."
      }
      searchEndpoint={"/learning/search"}
      ariaLabel={"Search learning"}
      placeholder={"What do you want to learn?"}
      searchButtonText={"Search"}
      backgroundColor="#B0E8DE"
      backgroundImage="/blue-wave.svg"
      textColor="#333333"
      includeSearch={false}
    />
  );
};
