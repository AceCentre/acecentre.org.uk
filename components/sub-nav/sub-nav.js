import { useHover, useFocusWithin } from "@react-aria/interactions";
import SvgIcon from "@material-ui/core/SvgIcon";
import Avatar from "@material-ui/core/Avatar";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Link from "next/link";
import { useState } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import styles from "./sub-nav.module.css";

export const SubNav = ({ navItems, active }) => {
  return (
    <FullWidthContainer>
      <InnerContainer>
        <ul className={styles.list}>
          {navItems.map((item, index) => (
            <NavItem
              index={index}
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

const NavItem = ({ navItem, isActive, index }) => {
  const { highlightProps, isHighlighted } = useHighlight();

  if (navItem.subItems.length > 10) throw new Error("Too many subitems");

  const firstNavList = navItem.subItems.slice(0, 5);
  const secondNavList = navItem.subItems.slice(5, 10);

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

      {index === 0 && (
        <nav className={styles.subNav}>
          <div className={styles.subNavInnerContainer}>
            <div className={styles.navContainer}>
              <p className={styles.explore}>{navItem.tagLine}</p>
              <div className={styles.listContainer}>
                <ul className={styles.subList}>
                  {firstNavList.map((subItem) => {
                    return (
                      <li className={styles.subListItem} key={subItem.href}>
                        <Link href={subItem.href}>
                          <a className={styles.subNavLink}>
                            <Avatar className={styles.arrowAvatar}>
                              <ArrowForwardIcon />
                            </Avatar>
                            {subItem.title}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <ul className={styles.subList}>
                  {secondNavList.map((subItem) => {
                    return (
                      <li className={styles.subListItem} key={subItem.href}>
                        <Link href={subItem.href}>
                          <a className={styles.subNavLink}>
                            <Avatar className={styles.arrowAvatar}>
                              <ArrowForwardIcon />
                            </Avatar>
                            {subItem.title}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div>
              <p>{navItem.ctaPrimary}</p>
            </div>
          </div>
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
    tagLine: "learn about us",
    href: "/about",
    ctaPrimary: "Contact us",
    ctaSecondary: "to learn more about us",
    subItems: [
      // TODO Make these links right
      { title: "About us", href: "/getting-started" },
      { title: "Our people", href: "/supporting-language" },
      { title: "Our trustees", href: "/supporting-access" },
      { title: "Work with us", href: "/working-in-schools" },
      { title: "People we support", href: "/family-and-friends" },
      { title: "Blog", href: "/family-and-friends" },
      { title: "Projects", href: "/family-and-friends" },
    ],
  },
  {
    title: "Getting started",
    href: "/getting-started",
    tagLine: "how to get started",
    subItems,
  },
  {
    title: "Resources",
    tagLine: "explore resources",
    href: "/resources",
    subItems,
  },
  {
    title: "Services",
    tagLine: "what we do",
    href: "/service",
    subItems,
  },
  {
    title: "AceCentre learning",
    tagLine: "start learning",
    href: "/acecentre-learning",
    subItems,
  },
  {
    title: "Get involved",
    tagLine: "get involved",
    href: "/get-involved",
    subItems,
  },
];
