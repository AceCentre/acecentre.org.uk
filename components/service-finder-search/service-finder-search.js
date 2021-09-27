import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button } from "../button/button";
import styles from "./service-finder-search.module.css";

export const ServiceFinderSearch = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <PostcodeInput />
        <div className={styles.buttonContainer}>
          <Button>Find services</Button>
        </div>
      </div>
      <ButtonAsLink>Or use your current location</ButtonAsLink>
    </div>
  );
};

const PostcodeInput = () => {
  return (
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input type="email" />
    </FormControl>
  );
};

const ButtonAsLink = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
