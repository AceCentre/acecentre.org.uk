import { Nav } from "../nav/nav";
import { SubNav } from "../sub-nav/sub-nav";
import styles from "./combined-nav.module.css";

export const CombinedNav = ({ cartCount, defaultNavItems }) => {
  return (
    <>
      <div className={styles.desktopContainer}>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </div>
      <div className={styles.mobileContainer}>Mobile</div>
    </>
  );
};
