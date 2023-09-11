import { Spinner } from "@chakra-ui/react";
import styles from "./full-page-spinner.module.css";

export const FullPageSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinnerContainer}>
        <Spinner
          size="xl"
          thickness="4px"
          emptyColor="gray.200"
          color="blue.500"
        />
        <p>Loading results from the language library</p>
      </div>
    </div>
  );
};
