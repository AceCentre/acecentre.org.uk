import { Nav } from "../nav/nav";
import { SubNav } from "../sub-nav/sub-nav";

export const CombinedNav = ({ cartCount, defaultNavItems }) => {
  return (
    <>
      <Nav numberOfItemsInCart={cartCount} />
      <SubNav navItems={defaultNavItems} />
    </>
  );
};
