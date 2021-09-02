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
  backgroundColor = "#bfdded",
  backgroundImage = "/wave.svg",
  textColor = "#00537f",
  includeSearch = true,
}) => {
  return (
    <>
      <style jsx>{`
        .container {
          background-color: ${backgroundColor};
          background-image: url(${backgroundImage});
        }

        .description {
          color: ${textColor};
        }
      `}</style>
      <div className={`${styles.container} container`}>
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
          <p className={`${styles.description} description`}>{description}</p>
          {includeSearch && (
            <form action={searchEndpoint} method="GET" className={styles.form}>
              <Input
                ariaLabel={ariaLabel}
                name="searchText"
                placeholder={placeholder}
                white
              >
                <button
                  className={styles.noStyleButton}
                  type="submit"
                  aria-label="Search"
                >
                  <SvgIcon>
                    <SearchIcon />
                  </SvgIcon>
                </button>
              </Input>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
