import { SearchBox } from "../search-box/search-box";

export const LearningSearch = () => {
  return (
    <SearchBox
      title={"Ace Centre Learning"}
      description={
        "Assistive Technology training for family members, carers, practitioners and professionals"
      }
      searchEndpoint={"/learning/all"}
      ariaLabel={"Search learning"}
      placeholder={"What do you want to learn?"}
      searchButtonText={"Search"}
      backgroundColor="#B0E8DE"
      backgroundImage="/blue-wave.svg"
      textColor="#333333"
    />
  );
};
