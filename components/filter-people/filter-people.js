import { createContext, useContext, useRef } from "react";
import styles from "./filter-people.module.css";

import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useFocusRing } from "@react-aria/focus";
import { useRadioGroupState } from "@react-stately/radio";
import { useRadioGroup, useRadio } from "@react-aria/radio";

const noop = () => {};

export const FilterPeople = ({
  defaultSelected = OPTIONS.ALL,
  onChange = noop,
}) => {
  return (
    <div className={styles.container}>
      <RadioGroup
        aria-label="Filter staff"
        defaultValue={defaultSelected}
        onChange={onChange}
      >
        <Radio value={OPTIONS.ALL}>All</Radio>
        <Radio value={OPTIONS.LEADERSHIP}>Leadership</Radio>
        <Radio value={OPTIONS.NORTH}>North office</Radio>
        <Radio value={OPTIONS.SOUTH}>South office</Radio>
      </RadioGroup>
    </div>
  );
};

export const OPTIONS = {
  ALL: "all",
  LEADERSHIP: "leadership",
  NORTH: "north",
  SOUTH: "south",
};

// Code taken from https://react-spectrum.adobe.com/react-aria/useRadioGroup.html

// RadioGroup is the same as in the previous example
let RadioContext = createContext();

const RadioGroup = (props) => {
  let { children, label } = props;
  let state = useRadioGroupState(props);
  let { radioGroupProps, labelProps } = useRadioGroup(props, state);

  return (
    <div {...radioGroupProps} className={styles.innerContainer}>
      {label && <span {...labelProps}>{label}</span>}
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </div>
  );
};

const Radio = (props) => {
  let { children } = props;
  let state = useContext(RadioContext);
  let ref = useRef(null);
  let { inputProps } = useRadio(props, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();

  let isSelected = state.selectedValue === props.value;

  return (
    <label className={styles.radioElement}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      <svg width={18} height={18} aria-hidden="true">
        <rect
          y={2}
          x={2}
          width={14}
          height={14}
          rx={2}
          fill={isSelected ? "#94C64E" : "#ffffff"}
        />
        {isFocusVisible && (
          <rect
            width={18}
            height={18}
            rx={2}
            stroke="#94C64E"
            strokeWidth={2}
            fill="none"
          />
        )}
      </svg>
      {children}
    </label>
  );
};
