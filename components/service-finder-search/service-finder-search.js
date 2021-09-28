import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button } from "../button/button";
import styles from "./service-finder-search.module.css";
import MyLocationIcon from "@material-ui/icons/MyLocation";

export const ServiceFinderSearch = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <PostcodeInput />
        <div className={styles.buttonContainer}>
          <Button>Find services</Button>
        </div>
      </div>
      <ButtonAsLink>
        Or use your current location
        <MyLocationIcon />
      </ButtonAsLink>
    </div>
  );
};

const PostcodeInput = () => {
  return (
    <FormControl>
      <FormLabel>Enter your postcode</FormLabel>
      <Input placeholder="eg. OL8 3QL" type="text" />
    </FormControl>
  );
};

const ButtonAsLink = ({ children, onClick }) => {
  return (
    <button className={styles.buttonAsLink} onClick={onClick}>
      {children}
    </button>
  );
};
