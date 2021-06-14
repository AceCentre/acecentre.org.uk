import styles from "./input.module.css";
import {
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

export const Input = ({ maxWidth, children, placeholder }) => {
  return (
    <>
      <InputGroup maxWidth={maxWidth}>
        <ChakraInput
          className={styles.input}
          backgroundColor="#F5F5F5"
          placeholder={placeholder}
        />
        <InputRightElement>{children}</InputRightElement>
      </InputGroup>
    </>
  );
};
