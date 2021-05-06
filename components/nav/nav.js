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
  // Append the number of items in the cart if there is any items
  const checkoutPostfix = numberOfItemsInCart
    ? ` (${numberOfItemsInCart})`
    : "";

  return (
    <FullWidthContainer>
      <InnerContainer>
        <HomeButton />
        <NavList>
          <NavLink href="/about">About</NavLink>

          <NavLink href="/blog">Blog</NavLink>

          <NavLink href="/contact">Contact</NavLink>

          <NavLink href="/my-acecentre" icon={faUser}>
            My AceCentre
          </NavLink>

          <NavLink href="/search" icon={faSearch}>
            Search
          </NavLink>

          <NavLink icon={faShoppingCart} href="/checkout">
            Checkout
            {checkoutPostfix}
          </NavLink>

          <NavLink className={styles.donate} href="/donate">
            Donate
          </NavLink>
        </NavList>
      </InnerContainer>
    </FullWidthContainer>
  );
};

const FullWidthContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

const InnerContainer = ({ children }) => {
  return <div className={styles.innerContainer}>{children}</div>;
};

const NavLink = ({ href, children, icon, className }) => {
  return (
    <li className={`${styles.listItem} ${className}`}>
      <Link href={href}>
        <a>
          {icon && <FontAwesomeIcon className={styles.navIcon} icon={icon} />}
          {children}
        </a>
      </Link>
    </li>
  );
};

const HomeButton = () => {
  return (
    <div className={styles.homeImage}>
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
    </div>
  );
};

const NavList = ({ children }) => {
  return (
    <nav>
      <ul className={styles.list}>{children}</ul>
    </nav>
  );
};
