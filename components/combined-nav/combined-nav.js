import { Image } from "../image";
import { Nav } from "../nav/nav";
import { SubNav } from "../sub-nav/sub-nav";
import styles from "./combined-nav.module.css";
import SvgIcon from "@material-ui/core/SvgIcon";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { Button as ChakraButton } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

const useMobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const onClickMenu = () => {
    // Make sure search is closed
    setIsSearchOpen(false);

    // Toggle menu open
    setIsMenuOpen(!isMenuOpen);
  };

  const onClickSearch = () => {
    // Make sure menu is closed
    setIsMenuOpen(false);

    // Toggle search open
    setIsSearchOpen(!isSearchOpen);
  };

  return {
    isDrawerOpen: isMenuOpen || isSearchOpen,
    isMenuOpen,
    isSearchOpen,
    onClickMenu,
    onClickSearch,
  };
};

export const CombinedNav = ({ cartCount, defaultNavItems }) => {
  const {
    isMenuOpen,
    isSearchOpen,
    isDrawerOpen,
    onClickMenu,
    onClickSearch,
  } = useMobileNav();

  return (
    <>
      <div className={styles.desktopContainer}>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </div>
      <div className={styles.mobileContainer}>
        <Link name="home" href="/">
          <a>
            <Image
              height={152}
              width={290}
              maxHeight={50}
              src={"/nav-logo.png"}
              alt="The AceCentre logo"
            ></Image>
          </a>
        </Link>
        <div className={styles.buttonContainer}>
          <ChakraButton
            className={`${styles.navButton} ${styles.menuButton} ${
              isMenuOpen ? styles.buttonOpen : ""
            }`}
            variant="unstyled"
            onClick={onClickMenu}
          >
            Menu
            <SvgIcon className={styles.icon}>
              <MenuIcon />
            </SvgIcon>
          </ChakraButton>
          <ChakraButton
            onClick={onClickSearch}
            className={`${styles.navButton}  ${
              isSearchOpen ? styles.buttonOpen : ""
            }`}
            variant="unstyled"
          >
            <SvgIcon className={styles.icon}>
              <SearchIcon />
            </SvgIcon>
          </ChakraButton>
        </div>
      </div>
      {isDrawerOpen && (
        <div>
          <p>Container</p>
          {isMenuOpen && <p>Menu</p>}
          {isSearchOpen && <p>search</p>}
        </div>
      )}
    </>
  );
};
