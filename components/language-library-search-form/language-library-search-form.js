import { SvgIcon } from "@material-ui/core";
import { Input } from "../input/input";
import styles from "./language-library-search-form.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "../button/button";
import { useRouter } from "next/router";
import { Checkbox as ChakraCheckbox } from "@chakra-ui/checkbox";
import { useQueryState, queryTypes } from "next-usequerystate";
import ClearIcon from "@material-ui/icons/Clear";
import { useMemo } from "react";
import Fuse from "fuse.js";
import { LanguageLibraryCard } from "../language-library-card/language-library-card";

const useLanguages = (resources, results) => {
  return useMemo(() => {
    console.log("Running, useLanguages");

    let languagesByKey = {};

    for (let resource of resources.nodes) {
      for (let language of resource.languages.nodes) {
        languagesByKey[language.slug] = {
          slug: language.slug,
          name: language.name,
          count: 0,
        };
      }
    }

    for (let resource of results) {
      for (let language of resource.languages.nodes) {
        languagesByKey[language.slug].count += 1;
      }
    }

    return Object.values(languagesByKey);
  }, [resources, results]);
};

function intersect(a, b) {
  var setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
}

const useFilter = (resources, { selectedLanguages, searchTerm }) => {
  console.log("RESOURCE", resources);

  let results = resources.nodes.filter((current) => {
    let isValid = true;

    // Languages
    const langSlugs = current.languages.nodes.map((x) => x.slug);
    const matchingLangs = intersect(langSlugs, selectedLanguages);
    if (matchingLangs.length !== selectedLanguages.length) {
      isValid = false;
    }

    return isValid;
  });

  // Search Term
  if (searchTerm) {
    const fuse = new Fuse(results, {
      keys: ["title"],
    });
    results = fuse.search(searchTerm).map((x) => x.item);
  }

  return results;
};

export const LanguageLibrarySearchForm = ({ resources }) => {
  const { query } = useRouter();
  const defaultSearchTerm = query.searchTerm || "";

  const [selectedLanguages, setSelectedLanguages] = useQueryState(
    "languages",
    queryTypes.array(queryTypes.string).withDefault([])
  );

  const results = useFilter(resources, {
    selectedLanguages,
    searchTerm: query.searchTerm,
  });
  const languages = useLanguages(resources, results);

  return (
    <div className={styles.container}>
      <form>
        <div className={styles.searchBar}>
          <Input
            name="searchTerm"
            defaultValue={defaultSearchTerm}
            placeholder="Search language library"
          >
            <SvgIcon>
              <SearchIcon />
            </SvgIcon>
          </Input>
          <Button type="submit">Search</Button>
        </div>
      </form>

      <div className={styles.filtersAndResult}>
        <div className={styles.filterContainer}>
          <h3>Language</h3>

          {languages.map((current) => (
            <div key={current.slug}>
              <Checkbox
                isChecked={selectedLanguages.includes(current.slug)}
                onChange={(currentEvent) => {
                  console.log(currentEvent.target.checked);
                  const newCheckedValue = currentEvent.target.checked;

                  let currentLanguages = selectedLanguages;
                  if (newCheckedValue) {
                    setSelectedLanguages([...currentLanguages, current.slug], {
                      shallow: true,
                    });
                  } else {
                    setSelectedLanguages(
                      currentLanguages.filter((x) => x != current.slug),
                      {
                        shallow: true,
                      }
                    );
                  }
                }}
              >
                ({current.count}) {current.name}
              </Checkbox>
            </div>
          ))}
        </div>
        <div>
          <p className={styles.resultsCount}>
            {results.length == 0
              ? "No results found"
              : `Found ${results.length} resources`}
          </p>
          {selectedLanguages.length > 0 && (
            <div className={styles.optionsList}>
              {selectedLanguages.map((current) => {
                const currentFullLanguage = languages.find(
                  (x) => x.slug == current
                );

                return (
                  <button
                    key={currentFullLanguage.slug}
                    className={styles.pillButton}
                    onClick={() => {
                      setSelectedLanguages(
                        selectedLanguages.filter((x) => x != current),
                        {
                          shallow: true,
                        }
                      );
                    }}
                  >
                    {currentFullLanguage.name}
                    <SvgIcon className={styles.icon}>
                      <ClearIcon />
                    </SvgIcon>
                  </button>
                );
              })}
            </div>
          )}
          <div className={styles.resultsList}>
            {results.map((current, index) => (
              <LanguageLibraryCard
                index={index}
                key={current.slug}
                resource={current}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const bgColor = "#EDEDF0";
const controlColor = "#94C64E";
const focusColor = "#67B100";

export const Checkbox = ({ children, spacing = "1rem", ...props }) => {
  return (
    <ChakraCheckbox spacing={spacing} sx={CHECKBOX_CLASSES} {...props}>
      {children}
    </ChakraCheckbox>
  );
};

const CHECKBOX_CLASSES = {
  h: "20px",
  my: "4px",
  p: "0px",
  w: "fit-content",
  _checked: {
    bg: bgColor,
    h: "20px",
    // px: "12px",
    borderRadius: "1px",
  },
  "span[class*='checkbox__control']:not([data-disabled])": {
    borderColor: controlColor,
    borderRadius: "2px",
    borderWidth: "3px",
    _checked: {
      bg: controlColor,
      borderColor: controlColor,
    },
    _focus: {
      boxShadow: `0 0 0 2px ${focusColor}`,
      _checked: {
        boxShadow: `0 0 0 2px ${focusColor}`,
      },
    },
    _after: {
      transitionProperty: "all",
      transitionDuration: "normal",
      content: '""',
      position: "absolute",
      width: "0px",
      height: "0px",
      bg: "transparent",
      borderRadius: "1px",
      zIndex: -1,
    },
  },
  _hover: {
    "span[class*='checkbox__control']:not([data-disabled])": {
      _after: {
        width: "40px",
        height: "40px",
        bg: bgColor,
        borderColor: controlColor,
      },
    },
  },
};
