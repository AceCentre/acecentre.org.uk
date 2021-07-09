import { Image } from "../image";
import { Nav } from "../nav/nav";
import { SubNav } from "../sub-nav/sub-nav";
import styles from "./combined-nav.module.css";
import SvgIcon from "@material-ui/core/SvgIcon";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { Button as ChakraButton } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Avatar } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Button } from "../button/button";
import { Input } from "../input/input";

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

export const CombinedNav = ({ defaultNavItems }) => {
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
        <Nav />
        <SubNav navItems={defaultNavItems} />
      </div>
      <div
        className={`${styles.mobileContainer} ${
          isDrawerOpen ? styles.noShadow : ""
        }`}
      >
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
          {isMenuOpen && (
            <MenuContent
              defaultNavItems={defaultNavItems}
              cartCount={cartCount}
            />
          )}
          {isSearchOpen && (
            <div className={styles.searchContainer}>
              <p className={styles.searchTagline}>Search our website</p>
              <Input white placeholder="Search">
                <SvgIcon>
                  <SearchIcon />
                </SvgIcon>
              </Input>
              <Button className={styles.donateButton}>Search</Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const MenuContent = ({ defaultNavItems, cartCount }) => {
  // No index will match -1
  const [currentlyOpen, setCurrentlyOpen] = useState(-1);

  const onNavItemClick = (index) => () => {
    if (currentlyOpen === -1) {
      setCurrentlyOpen(index);
    } else if (currentlyOpen === index) {
      setCurrentlyOpen(-1);
    } else {
      setCurrentlyOpen(index);
    }
  };

  // Append the number of items in the cart if there is any items
  const checkoutPostfix = cartCount ? ` (${cartCount})` : "";

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
                          <Link href={item.href}>
                            <a className={styles.subNavLink}>
                              <Avatar className={styles.arrowAvatar}>
                                <ChevronRightIcon
                                  className={styles.avatarIcon}
                                />
                              </Avatar>
                              {item.title}
                            </a>
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
            <Link href="/blog">
              <a className={styles.subNavLink}>Blog</a>
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.menuContentListItem}>
            <Link href="/contact">
              <a className={styles.subNavLink}>Contact</a>
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.menuContentListItem}>
            <Link href="/my-acecentre">
              <a className={styles.subNavLink}>
                <SvgIcon>
                  <PersonOutlineOutlinedIcon />
                </SvgIcon>
                My AceCentre
              </a>
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.menuContentListItem}>
            <Link href="/checkout">
              <a className={styles.subNavLink}>
                <SvgIcon>
                  <ShoppingCartOutlinedIcon />
                </SvgIcon>
                Checkout
                {checkoutPostfix}
              </a>
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.menuContentListItem}>
            <Link href="tel:0800 080 3115">
              <a className={styles.subNavLink}>
                <SvgIcon>
                  <PhoneOutlinedIcon />
                </SvgIcon>
                0800 080 3115
              </a>
            </Link>
          </div>
        </li>
      </ul>
      <div>
        <Button className={styles.donateButton} href="/donate">
          Donate
        </Button>
      </div>
    </>
  );
};
