import { useHover, useFocusWithin } from "@react-aria/interactions";
import SvgIcon from "@material-ui/core/SvgIcon";
import Avatar from "@material-ui/core/Avatar";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Link from "next/link";
import { useState } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import styles from "./sub-nav.module.css";
import { NavCta } from "../nav-cta/nav-cta";

export { defaultNavItems } from "./sub-nav-items";

export const SubNav = ({ navItems, active }) => {
  return (
    <FullWidthContainer>
      <InnerContainer>
        <ul className={styles.list}>
          {navItems.map((item, index) => (
            <NavItem
              index={index}
              isActive={item.href === active}
              key={`subnav-item-${item.href}`}
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

  const [timeout, storeTimeout] = useState(null);

  let { hoverProps } = useHover({
    onHoverChange: (latestHovered) => {
      if (latestHovered === true) {
        clearTimeout(timeout);
        const newTimeout = setTimeout(() => {
          setIsHovered(true);
        }, 400);
        storeTimeout(newTimeout);
      }

      if (latestHovered === false) {
        clearTimeout(timeout);
        setIsHovered(latestHovered);
      }
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

const NavItem = ({ navItem }) => {
  const { highlightProps, isHighlighted } = useHighlight();

  if (navItem.subItems.length > 10) throw new Error("Too many subitems");

  const firstNavList = navItem.subItems.slice(0, 5);
  const secondNavList = navItem.subItems.slice(5, 10);

  return (
    <li
      {...highlightProps}
      className={`${styles.listItem}  ${
        isHighlighted ? styles.activeItem : ""
      }`}
    >
      <Link href={navItem.href}>
        <a className={styles.navLink}>
          {navItem.title}{" "}
          <SvgIcon
            className={`${styles.animate} ${
              isHighlighted ? styles.rotated : ""
            }`}
            fontSize="inherit"
          >
            <KeyboardArrowRightIcon />
          </SvgIcon>
        </a>
      </Link>

      {isHighlighted && (
        <nav className={styles.subNav}>
          <div className={styles.subNavInnerContainer}>
            <div className={styles.navContainer}>
              <p className={styles.explore}>{navItem.tagLine}</p>
              <div className={styles.listContainer}>
                <ul className={styles.subList}>
                  {firstNavList.map((subItem) => {
                    return (
                      <li
                        className={styles.subListItem}
                        key={`subnav-item-first-${subItem.href}`}
                      >
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
                      <li
                        className={styles.subListItem}
                        key={`subnav-item-second-${subItem.href}`}
                      >
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
              <NavCta {...navItem.cta} />
            </div>
          </div>
        </nav>
      )}
    </li>
  );
};

export const SUB_NAV_HEADERS = {
  GETTING_STARTED: "/getting-started",
  RESOURCES: "/resources",
  SERVICES: "/services",
  ACECENTRE_LEARNING: "/learning",
  GET_INVOLVED: "/get-involved",
};
