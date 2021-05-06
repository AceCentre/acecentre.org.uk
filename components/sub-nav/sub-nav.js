import { useHover, useFocusWithin } from "@react-aria/interactions";

import Link from "next/link";
import { useState } from "react";

export const SubNav = ({ navItems }) => {
  return (
    <nav>
      <ul>
        {navItems.map((item) => (
          <NavItem key={item.href} navItem={item} />
        ))}
      </ul>
    </nav>
  );
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

const NavItem = ({ navItem }) => {
  let { highlightProps, isHighlighted } = useHighlight();

  return (
    <li {...highlightProps}>
      <Link href={navItem.href}>{navItem.title}</Link>

      {isHighlighted && (
        <nav>
          <ul>
            {navItem.subItems.map((subItem) => {
              return (
                <li key={subItem.href}>
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

export const defaultNavItems = [
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
    href: "/services",
    subItems,
  },
  {
    title: "AceCentre Learning",
    href: "/acecentre-learning",
    subItems,
  },
  {
    title: "Get involved",
    href: "/get-involved",
    subItems,
  },
];
