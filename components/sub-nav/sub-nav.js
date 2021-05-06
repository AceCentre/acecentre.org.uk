import Link from "next/link";

export const SubNav = ({ navItems }) => {
  console.log(navItems);

  return (
    <nav>
      <ul>
        {navItems.map((item) => {
          return (
            <li key={item.href}>
              <Link href={item.href}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export const defaultNavItems = [
  {
    title: "Getting started",
    href: "/getting-started",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "AceCentre Learning",
    href: "/acecentre-learning",
  },
  {
    title: "Get involved",
    href: "/get-involved",
  },
];
