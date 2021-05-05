import {
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

import { Image } from "../image";
import styles from "./nav.module.css";

export const Nav = ({ numberOfItemsInCart = 0 }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.homeImage}>
          <Link name="home" href="/">
            <a>
              <HomeImage />
            </a>
          </Link>
        </div>
        <div>
          <NavList>
            <NavItem>
              <Link href="/about">About</Link>
            </NavItem>
            <NavItem>
              <Link href="/blog">Blog</Link>
            </NavItem>
            <NavItem>
              <Link href="/contact">Contact</Link>
            </NavItem>
            <NavItem>
              <Link href="/my-acecentre">
                <a>
                  <NavIcon icon={faUser} />
                  My AceCentre
                </a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/search">
                <a>
                  <NavIcon icon={faSearch} />
                  Search
                </a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/checkout">
                <a>
                  <NavIcon icon={faShoppingCart} />
                  Checkout
                  {numberOfItemsInCart ? ` (${numberOfItemsInCart})` : ""}
                </a>
              </Link>
            </NavItem>
            <NavItem className={styles.donate}>
              <DonateButton />
            </NavItem>
          </NavList>
        </div>
      </div>
    </div>
  );
};

const NavIcon = ({ icon }) => {
  return <FontAwesomeIcon className={styles.navIcon} icon={icon} />;
};

const HomeImage = () => {
  return (
    <Image
      height={152}
      width={290}
      maxHeight={50}
      src={"/nav-logo.png"}
      alt="The AceCentre logo"
    ></Image>
  );
};

const DonateButton = () => {
  return <Link href="/donate">Donate</Link>;
};

const NavList = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};

const NavItem = ({ children, className }) => {
  return <li className={`${styles.listItem} ${className}`}>{children}</li>;
};
