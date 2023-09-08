import { SvgIcon } from "@material-ui/core";
import { Input } from "../input/input";
import styles from "./language-library-search-form.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "../button/button";
import { useRouter } from "next/router";
import { Checkbox as ChakraCheckbox } from "@chakra-ui/checkbox";
import { useQueryState, queryTypes } from "next-usequerystate";
import ClearIcon from "@material-ui/icons/Clear";

export const LanguageLibrarySearchForm = () => {
  const { query } = useRouter();
  const defaultSearchTerm = query.searchTerm || "";

  const [selectedLanguages, setSelectedLanguages] = useQueryState(
    "languages",
    queryTypes.array(queryTypes.string)
  );

  const languages = [
    {
      slug: "bengali",
      name: "Bengali",
      count: 1,
    },
    {
      slug: "english",
      name: "English",
      count: 1,
    },
    {
      slug: "french",
      name: "French",
      count: 1,
    },
    {
      slug: "german",
      name: "German",
      count: 1,
    },
    {
      slug: "mandarin",
      name: "Mandarin",
      count: 1,
    },
    {
      slug: "polish",
      name: "Polish",
      count: 1,
    },
    {
      slug: "spanish",
      name: "Spanish",
      count: 1,
    },
    {
      slug: "urdu",
      name: "Urdu",
      count: 1,
    },
  ];

  return (
    <div className={styles.container}>
      <form>
        <div className={styles.searchBar}>
          <Input
            name="searchTerm"
            value={defaultSearchTerm}
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
                isChecked={(selectedLanguages || []).includes(current.slug)}
                onChange={(currentEvent) => {
                  console.log(currentEvent.target.checked);
                  const newCheckedValue = currentEvent.target.checked;

                  let currentLanguages = selectedLanguages || [];
                  if (newCheckedValue) {
                    setSelectedLanguages([...currentLanguages, current.slug]);
                  } else {
                    setSelectedLanguages(
                      currentLanguages.filter((x) => x != current.slug)
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
          <div className={styles.optionsList}>
            {(selectedLanguages || []).map((current) => {
              const currentFullLanguage = languages.find(
                (x) => x.slug == current
              );

              return (
                <button
                  key={currentFullLanguage.slug}
                  className={styles.pillButton}
                  onClick={() => {
                    setSelectedLanguages(
                      selectedLanguages.filter((x) => x != current)
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
