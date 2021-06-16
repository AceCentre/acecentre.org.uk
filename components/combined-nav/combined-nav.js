import { Image } from "../image";
import { Nav } from "../nav/nav";
import { SubNav } from "../sub-nav/sub-nav";
import styles from "./combined-nav.module.css";
import SvgIcon from "@material-ui/core/SvgIcon";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { Button as ChakraButton } from "@chakra-ui/react";
import Link from "next/link";

export const CombinedNav = ({ cartCount, defaultNavItems }) => {
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
            className={`${styles.navButton} ${styles.menuButton}`}
            variant="unstyled"
          >
            Menu
            <SvgIcon className={styles.icon}>
              <MenuIcon />
            </SvgIcon>
          </ChakraButton>
          <ChakraButton className={styles.navButton} variant="unstyled">
            <SvgIcon className={styles.icon}>
              <SearchIcon />
            </SvgIcon>
          </ChakraButton>
        </div>
      </div>
    </>
  );
};
