import { SearchBox } from "../search-box/search-box";

export const LearningSearch = () => {
  return (
    <SearchBox
      title={"Ace Centre Learning"}
      description={
        "Our courses focus on the use of Assistive Technology to enable independence, access to education, learning and leisure activities, and communication."
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
