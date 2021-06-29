import styles from "./search-box.module.css";
import { Input } from "../input/input";

import SvgIcon from "@material-ui/core/SvgIcon";
import SearchIcon from "@material-ui/icons/Search";

export const SearchBox = ({
  title,
  description,
  searchEndpoint,
  ariaLabel,
  placeholder,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.titleContainer}>
          <img
            width="41px"
            height="48px"
            src="/dash-black.svg"
            alt="A brush stroke"
          />
          <h1>{title}</h1>
        </div>
        <p className={styles.description}>{description}</p>
        <form action={searchEndpoint} method="GET" className={styles.form}>
          <Input
            ariaLabel={ariaLabel}
            name="searchText"
            placeholder={placeholder}
            white
          >
            <SvgIcon>
              <SearchIcon />
            </SvgIcon>
          </Input>
        </form>
      </div>
    </div>
  );
};
