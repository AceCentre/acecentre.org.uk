import SvgIcon from "@mui/material/SvgIcon";
import { Input } from "../input/input";
import styles from "./language-library-search-form.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "../button/button";
import { Checkbox as ChakraCheckbox } from "@chakra-ui/checkbox";
import { useQueryStates, queryTypes } from "next-usequerystate";
import ClearIcon from "@mui/icons-material/Clear";
import Fuse from "fuse.js";
import { LanguageLibraryCard } from "../language-library-card/language-library-card";
import {
  DETAILS_CONFIG,
  flatSections,
} from "../language-library-details/language-library-details";
import { Fragment } from "react";

function intersect(a, b) {
  var setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
}

const useSearchFormState = () => {
  const stateOptions = flatSections(DETAILS_CONFIG).reduce((acc, current) => {
    if (current.queryType && current.allowFilter !== false) {
      acc[current.slug] = current.queryType;
    }
    return acc;
  }, {});

  const [fullState, setFullState] = useQueryStates(
    {
      searchTerm: queryTypes.string.withDefault(""),
      ...stateOptions,
    },
    {
      history: "push",
    }
  );

  return { ...fullState, setFullState };
};

const filter = (resources, fullState, searchTerm) => {
  let results = resources.filter((current) => {
    const stateEntries = Object.entries(fullState);

    for (const [key, values] of stateEntries) {
      if (values.length == 0) continue;

      const currentSection = flatSections(DETAILS_CONFIG).find(
        (x) => x.slug == key
      );

      let currentSlugs = currentSection.getFilterValues(current);

      const matchingLangs = intersect(currentSlugs, values);
      if (matchingLangs.length !== values.length) {
        return false;
      }
    }

    return true;
  });

  if (searchTerm) {
    const fuse = new Fuse(results, {
      keys: ["title"],
    });
    results = fuse.search(searchTerm).map((x) => x.item);
  }

  return results;
};

export const LanguageLibrarySearchForm = ({ resources, fields }) => {
  const { searchTerm, setFullState, ...fullState } = useSearchFormState();

  let results = filter(resources, fullState, searchTerm);

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFullState({ searchTerm: e.target.searchTerm.value });
        }}
      >
        <div className={styles.searchBar}>
          <Input
            name="searchTerm"
            defaultValue={searchTerm}
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
        <div>
          <div className={styles.filterContainer}>
            {flatSections(DETAILS_CONFIG).map((section) => {
              if (section.allowFilter == false) return null;

              const uniqueValues = section.getAllUniqueValues(
                resources,
                results,
                fields
              );

              return (
                <div key={section.slug}>
                  <p className={styles.sectionName}>{section.name}</p>
                  <p className={styles.description}>{section.tooltip}</p>
                  {uniqueValues.map((current) => (
                    <div key={current.slug}>
                      <Checkbox
                        isChecked={fullState[section.slug].includes(
                          current.slug
                        )}
                        onChange={(currentEvent) => {
                          const newCheckedValue = currentEvent.target.checked;

                          let currentValues = fullState[section.slug];
                          if (newCheckedValue) {
                            setFullState(
                              {
                                [section.slug]: [
                                  ...currentValues,
                                  current.slug,
                                ],
                              },
                              {
                                shallow: true,
                              }
                            );
                          } else {
                            setFullState(
                              {
                                [section.slug]: currentValues.filter(
                                  (x) => x != current.slug
                                ),
                              },
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
              );
            })}
          </div>
        </div>
        <div className={styles.rightColumn}>
          {Object.values(fullState).flat().length > 0 ? (
            <>
              <p className={styles.resultsCount}>
                {results.length == 0
                  ? "No results found matching the following criteria:"
                  : `Found ${results.length} resources matching the following criteria:`}
              </p>
              <div className={styles.optionsList}>
                {Object.entries(fullState).map((current) => {
                  const currentSection = flatSections(DETAILS_CONFIG).find(
                    (x) => x.slug == current[0]
                  );

                  const uniqueValues = currentSection.getAllUniqueValues(
                    resources,
                    results,
                    fields
                  );

                  return (
                    <Fragment key={current[0]}>
                      {current[1].map((value) => {
                        let currentFull = uniqueValues.find(
                          (x) => x.slug == value
                        );

                        return (
                          <button
                            key={currentFull.slug}
                            className={styles.pillButton}
                            onClick={() => {
                              setFullState(
                                {
                                  [current[0]]: current[1].filter(
                                    (x) => x != value
                                  ),
                                },
                                {
                                  shallow: true,
                                }
                              );
                            }}
                          >
                            {currentFull.name}
                            <SvgIcon className={styles.icon}>
                              <ClearIcon />
                            </SvgIcon>
                          </button>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </div>
            </>
          ) : (
            <p className={styles.resultsCount}>
              {results.length == 0
                ? "No results found"
                : `Found ${results.length} resources`}
            </p>
          )}

          <div className={styles.resultsList}>
            {results.map((current, index) => (
              <LanguageLibraryCard
                index={index}
                key={current.post.post_name}
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
  my: "4px",
  p: "0px",
  w: "fit-content",
  _checked: {
    bg: bgColor,
    // h: "20px",
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
