import { Image } from "../image";
import { Nav } from "../nav/nav";
import { SubNav } from "../sub-nav/sub-nav";
import styles from "./combined-nav.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Button as ChakraButton } from "@chakra-ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/material/Avatar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { OldBrowserBanner } from "../old-browser-banner/old-browser-banner";
import { useAuth } from "../../lib/auth-hook";

const useMobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isDrawerOpen = isMenuOpen || isSearchOpen;

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
  }, [isDrawerOpen]);

  const onClickMenu = () => {
    // Make sure search is closed
    setIsSearchOpen(false);

    // Toggle menu open
    const newMenuOpen = !isMenuOpen;
    setIsMenuOpen(newMenuOpen);
  };

  const onClickSearch = () => {
    // Make sure menu is closed
    setIsMenuOpen(false);

    // Toggle search open
    const newSearchOpen = !isSearchOpen;
    setIsSearchOpen(newSearchOpen);
  };

  return {
    isDrawerOpen: isMenuOpen || isSearchOpen,
    isMenuOpen,
    isSearchOpen,
    onClickMenu,
    onClickSearch,
  };
};

export const CombinedNav = ({
  defaultNavItems,
  nhs = false,
  atScholar = false,
  nhsTitle,
  noPhoneNumber = false,
}) => {
  const { isMenuOpen, isSearchOpen, isDrawerOpen, onClickMenu, onClickSearch } =
    useMobileNav();

  const [isCypress, setIsCypress] = useState(false);

  useEffect(() => {
    if (
      navigator &&
      navigator.userAgent &&
      (navigator.userAgent.toLowerCase().includes("headless") ||
        navigator.userAgent.toLowerCase().includes("puppeteer"))
    ) {
      console.log("Cypress detected", navigator.userAgent);
      setIsCypress(true);
    }
  }, []);

  return (
    <>
      <OldBrowserBanner />

      <div
        className={`${styles.desktopContainer} ${
          isCypress ? styles.isCypressDesktop : ""
        }`}
      >
        <Nav
          nhs={nhs}
          atScholar={atScholar}
          nhsTitle={nhsTitle}
          noPhoneNumber={noPhoneNumber}
        />
        {!nhs && !atScholar && <SubNav navItems={defaultNavItems} />}
      </div>
      <div
        className={`${styles.mobileContainer} ${
          isDrawerOpen ? styles.noShadow : ""
        } ${isCypress ? styles.isCypressMobile : ""}`}
      >
        {nhs && (
          <Link name="home" href="/">
            <Image
              height={118}
              width={293}
              maxHeight={50}
              src={"/nhs-logo.jpg"}
              alt="The NHS logo"
            ></Image>
          </Link>
        )}
        {atScholar && (
          <Link name="home" href="/">
            <Image
              height={720}
              width={1800}
              maxHeight={100}
              src={"/at-scholar-logo2.png"}
              alt="The AT Scholar logo"
            ></Image>
          </Link>
        )}
        {!nhs && !atScholar && (
          <Link name="home" href="/">
            <Image
              height={152}
              width={290}
              maxHeight={50}
              src={"/nav-logo.png"}
              alt="The Ace Centre logo"
            ></Image>
          </Link>
        )}
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
            aria-label="Search button"
          >
            <SvgIcon className={styles.icon}>
              <SearchIcon />
            </SvgIcon>
          </ChakraButton>
        </div>
      </div>
      {isDrawerOpen && (
        <div className={styles.drawer}>
          {isMenuOpen && <MenuContent defaultNavItems={defaultNavItems} />}
          {isSearchOpen && (
            <form
              action="/search"
              method="GET"
              className={styles.searchContainer}
            >
              <p className={styles.searchTagline}>Search our website</p>
              <Input
                ariaLabel="Search text"
                name="searchText"
                white
                placeholder="Search"
              >
                <SvgIcon>
                  <SearchIcon />
                </SvgIcon>
              </Input>
              <Button type="submit" className={styles.donateButton}>
                Search
              </Button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

const MenuContent = ({ defaultNavItems }) => {
  // No index will match -1
  const [currentlyOpen, setCurrentlyOpen] = useState(-1);
  const { loggedInStatus } = useAuth();

  const onNavItemClick = (index) => () => {
    if (currentlyOpen === -1) {
      setCurrentlyOpen(index);
    } else if (currentlyOpen === index) {
      setCurrentlyOpen(-1);
    } else {
      setCurrentlyOpen(index);
    }
  };

  return (
    <>
      <ul className={styles.menuContentList}>
        {defaultNavItems.map((navItem, index) => {
          return (
            <li key={`navItem-${navItem.title}`}>
              <div className={styles.menuContentListItem}>
                <ChakraButton
                  className={styles.menuContentListButton}
                  variant="unstyled"
                  onClick={onNavItemClick(index)}
                >
                  {navItem.title}
                  <SvgIcon className={styles.menuContentIcon}>
                    <KeyboardArrowDownIcon />
                  </SvgIcon>
                </ChakraButton>
              </div>
              {currentlyOpen === index && (
                <div>
                  <p className={styles.tagLine}>{navItem.tagLine}</p>
                  <ul className={styles.subNavList}>
                    {navItem.subItems.map((item) => {
                      return (
                        <li key={`subNav-${item.title}`}>
                          <Link href={item.href} className={styles.subNavLink}>
                            <Avatar className={styles.arrowAvatar}>
                              <ChevronRightIcon className={styles.avatarIcon} />
                            </Avatar>
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
        <li>
          <div className={styles.menuContentListItem}>
            <Link href="/form/general-feedback" className={styles.subNavLink}>
              Feedback
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.menuContentListItem}>
            <Link href="/blog" className={styles.subNavLink}>
              Blog
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.menuContentListItem}>
            <Link href="/contact" className={styles.subNavLink}>
              Contact
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.menuContentListItem}>
            <Link href="/my-acecentre" className={styles.subNavLink}>
              <SvgIcon>
                <PersonOutlineOutlinedIcon />
              </SvgIcon>
              {loggedInStatus ? "My Ace Centre" : "Login"}
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.menuContentListItem}>
            <Link href="/basket" className={styles.subNavLink}>
              <SvgIcon>
                <ShoppingCartOutlinedIcon />
              </SvgIcon>
              Checkout
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.menuContentListItem}>
            <Link href="tel:0800 080 3115" className={styles.subNavLink}>
              <SvgIcon>
                <PhoneOutlinedIcon />
              </SvgIcon>
              0800 080 3115
            </Link>
          </div>
        </li>
      </ul>
      <div>
        <Button className={styles.donateButton} href="/get-involved/donate">
          Donate
        </Button>
      </div>
    </>
  );
};
