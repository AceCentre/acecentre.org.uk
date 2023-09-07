import styles from "./input.module.css";
import {
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/input";

export const Input = ({
  maxWidth,
  children,
  placeholder,
  white,
  name,
  ariaLabel,
  type,
  withLabel = false,
  required,
  value,
}) => {
  return (
    <InputGroup
      maxWidth={maxWidth}
      className={withLabel ? styles.withLabel : ""}
    >
      {withLabel && <label htmlFor={name}>{ariaLabel}:</label>}
      <ChakraInput
        className={styles.input}
        backgroundColor={white ? "white" : "#F5F5F5"}
        placeholder={placeholder}
        name={name}
        aria-label={ariaLabel}
        type={type}
        required={required}
        value={value}
      />
      <InputRightElement zIndex={1}>{children}</InputRightElement>
    </InputGroup>
  );
};
