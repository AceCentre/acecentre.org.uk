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
}) => {
  return (
    <>
      <InputGroup maxWidth={maxWidth}>
        <ChakraInput
          className={styles.input}
          backgroundColor={white ? "white" : "#F5F5F5"}
          placeholder={placeholder}
          name={name}
          aria-label={ariaLabel}
        />
        <InputRightElement zIndex={1}>{children}</InputRightElement>
      </InputGroup>
    </>
  );
};
