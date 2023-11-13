import { useState } from "react";
import { Button } from "../button/button";
import { Input } from "../input/input";
import styles from "./language-library-landing-search.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import SearchIcon from "@mui/icons-material/Search";

export const LanguageLibraryLandingSearch = ({ languages }) => {
  const [languageValue, setLanguageValue] = useState("");

  return (
    <div className={styles.container}>
      <form action="/language-library/all">
        <div className={styles.searchBar}>
          <Input name="searchTerm" placeholder="Search language library">
            <SvgIcon>
              <SearchIcon />
            </SvgIcon>
          </Input>
          <Button type="submit">Search</Button>
        </div>
        <input name="languages" value={languageValue} type="hidden" />
        <ul className={styles.languageList}>
          {languages.map((language) => (
            <li className={styles.languageListItem} key={language.slug}>
              <button
                className={styles.languageButton}
                onClick={() => {
                  setLanguageValue(language.slug);
                }}
              >
                {language.name}
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};
