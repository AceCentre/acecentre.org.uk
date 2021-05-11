import { useState } from "react";
import styles from "./filter-people.module.css";

export const FilterPeople = ({ defaultSelected = OPTIONS.ALL }) => {
  const [selected, setSelected] = useState(defaultSelected);

  const onSelect = (event) => {
    const value = event.target.value;

    setSelected(value);
  };

  return (
    <div className={styles.container}>
      <RadioButton
        onSelect={onSelect}
        currentlySelected={selected}
        optionValue={OPTIONS.ALL}
        optionDescription="All"
      />

      <RadioButton
        onSelect={onSelect}
        currentlySelected={selected}
        optionValue={OPTIONS.LEADERSHIP}
        optionDescription="Leadership"
      />

      <RadioButton
        onSelect={onSelect}
        currentlySelected={selected}
        optionValue={OPTIONS.NORTH}
        optionDescription="North Office"
      />

      <RadioButton
        onSelect={onSelect}
        currentlySelected={selected}
        optionValue={OPTIONS.SOUTH}
        optionDescription="South Office"
      />
    </div>
  );
};

const RadioButton = ({
  onSelect,
  currentlySelected,
  optionValue,
  optionDescription,
}) => {
  return (
    <label htmlFor={optionValue} className={styles.radioContainer}>
      <input
        type="radio"
        id={optionValue}
        name="peopleFilter"
        value={optionValue}
        onChange={onSelect}
        checked={currentlySelected === optionValue}
      />
      {optionDescription}
    </label>
  );
};

const OPTIONS = {
  ALL: "all",
  LEADERSHIP: "leadership",
  NORTH: "north",
  SOUTH: "south",
};
