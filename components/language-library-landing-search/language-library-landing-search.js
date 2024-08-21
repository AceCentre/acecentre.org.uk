import { useState } from "react";
import { Button } from "../button/button";
import { Input } from "../input/input";
import styles from "./language-library-landing-search.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const splitLanguages = (languages) => {
  let firstLangs = [];
  let secondLangs = [];
  const sorted = languages.sort((a, b) => b.count - a.count);

  for (const current of sorted) {
    if (firstLangs.length > 10) {
      secondLangs.push(current);
    } else {
      firstLangs.push(current);
    }
  }

  return [firstLangs, secondLangs];
};

export const LanguageLibraryLandingSearch = ({ languages }) => {
  const [languageValue, setLanguageValue] = useState("");
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const [initialLanguages, restOfLangs] = splitLanguages(languages);

  return (
    <div className={styles.container}>
      <form action="/language-library/all">
        <div className={styles.searchBar}>
          <Input name="searchTerm" placeholder="Search AAC language library">
            <SvgIcon>
              <SearchIcon />
            </SvgIcon>
          </Input>
          <Button type="submit">Search</Button>
        </div>
        <input name="languages" value={languageValue} type="hidden" />
        <ul className={styles.languageList}>
          {initialLanguages.map((language) => (
            <li className={styles.languageListItem} key={language.slug}>
              <button
                className={styles.languageButton}
                onClick={() => {
                  setLanguageValue(language.slug);
                }}
              >
                {language.name} ({language.count})
              </button>
            </li>
          ))}
          {showAllLanguages && (
            <>
              {restOfLangs.map((language) => (
                <li className={styles.languageListItem} key={language.slug}>
                  <button
                    className={styles.languageButton}
                    onClick={() => {
                      setLanguageValue(language.slug);
                    }}
                  >
                    {language.name} ({language.count})
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
        <Button
          className={styles.showMore}
          type="button"
          onClick={() => setShowAllLanguages(!showAllLanguages)}
        >
          Show {showAllLanguages ? "Less" : "More"}{" "}
          <ChevronRightIcon
            className={`${showAllLanguages ? styles.upIcon : styles.downIcon}`}
          />
        </Button>
      </form>
    </div>
  );
};
