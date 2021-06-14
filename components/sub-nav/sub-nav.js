import { useHover, useFocusWithin } from "@react-aria/interactions";
import SvgIcon from "@material-ui/core/SvgIcon";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Link from "next/link";
import { useState } from "react";

import styles from "./sub-nav.module.css";

// We split the sub lists into two columns if there
// more than 5 sub items
const SPLIT_AFTER = 5;

export const SubNav = ({ navItems, active }) => {
  return (
    <FullWidthContainer>
      <InnerContainer>
        <ul className={styles.list}>
          {navItems.map((item) => (
            <NavItem
              isActive={item.href === active}
              key={item.href}
              navItem={item}
            />
          ))}
        </ul>
      </InnerContainer>
    </FullWidthContainer>
  );
};

const InnerContainer = ({ children }) => {
  return (
    <nav data-testid="subnav" className={styles.innerContainer}>
      {children}
    </nav>
  );
};

const FullWidthContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

const useHighlight = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  let { hoverProps } = useHover({
    onHoverChange: (latestHovered) => {
      setIsHovered(latestHovered);
    },
  });

  let { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: (latestFocused) => {
      setIsFocused(latestFocused);
    },
  });

  return {
    highlightProps: { ...hoverProps, ...focusWithinProps },
    isHighlighted: isHovered || isFocused,
  };
};

const NavItem = ({ navItem, isActive }) => {
  let { highlightProps, isHighlighted } = useHighlight();

  const splitOverTwoColumns = navItem.subItems.length > SPLIT_AFTER;

  return (
    <li
      {...highlightProps}
      className={`${styles.listItem}  ${isActive ? styles.activeItem : ""}`}
    >
      <Link href={navItem.href}>
        <a className={styles.navLink}>
          {navItem.title}{" "}
          <SvgIcon fontSize="inherit">
            <KeyboardArrowDownIcon />
          </SvgIcon>
        </a>
      </Link>

      {isHighlighted && (
        <nav className={styles.subNav}>
          <p className={styles.explore}>Explore</p>
          <ul
            className={`${styles.subList} ${
              splitOverTwoColumns ? styles.listSplit : ""
            }`}
          >
            {navItem.subItems.map((subItem) => {
              return (
                <li className={styles.subListItem} key={subItem.href}>
                  <Link href={subItem.href}>{subItem.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </li>
  );
};

const subItems = [
  { title: "Getting started", href: "/getting-started" },
  { title: "Supporting language", href: "/supporting-language" },
  { title: "Supporting access", href: "/supporting-access" },
  { title: "Working in schools", href: "/working-in-schools" },
  { title: "Family and friends", href: "/family-and-friends" },
  { title: "Software", href: "/software" },
  { title: "Alphabet resources", href: "/alphabet-resources" },
  { title: "Symbol resources", href: "/symbol-resources" },
  { title: "All resources", href: "/all-resources" },
];

export const SUB_NAV_HEADERS = {
  GETTING_STARTED: "/getting-started",
  RESOURCES: "/resources",
  SERVICES: "/services",
  ACECENTRE_LEARNING: "/acecentre-learning",
  GET_INVOLVED: "/get-involved",
};

export const defaultNavItems = [
  {
    title: "About",
    href: "/about",
    subItems: [
      { title: "Getting started", href: "/getting-started" },
      { title: "Supporting language", href: "/supporting-language" },
      { title: "Supporting access", href: "/supporting-access" },
      { title: "Working in schools", href: "/working-in-schools" },
      { title: "Family and friends", href: "/family-and-friends" },
    ],
  },
  {
    title: "Getting started",
    href: "/getting-started",
    subItems,
  },
  {
    title: "Resources",
    href: "/resources",
    subItems,
  },
  {
    title: "Services",
    href: "/service",
    subItems,
  },
  {
    title: "AceCentre learning",
    href: "/acecentre-learning",
    subItems,
  },
  {
    title: "Get involved",
    href: "/get-involved",
    subItems,
  },
];
