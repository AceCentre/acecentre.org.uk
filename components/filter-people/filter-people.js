import { useState } from "react";
import styles from "./filter-people.module.css";

const noop = () => {};

export const FilterPeople = ({
  defaultSelected = OPTIONS.ALL,
  onChange = noop,
}) => {
  const [selected, setSelected] = useState(defaultSelected);

  const onSelect = (event) => {
    const value = event.target.value;

    onChange(value);
    setSelected(value);
  };

  return (
    <div className={styles.container}>
      <h2>Filter People</h2>
      <div className={styles.innerContainer}>
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

export const OPTIONS = {
  ALL: "all",
  LEADERSHIP: "leadership",
  NORTH: "north",
  SOUTH: "south",
};
