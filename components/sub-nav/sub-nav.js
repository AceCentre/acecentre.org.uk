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
              <nav>
                <ul>
                  {item.subItems.map((subItem) => {
                    return (
                      <li key={subItem.href}>
                        <Link href={subItem.href}>{subItem.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </li>
          );
        })}
      </ul>
    </nav>
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
