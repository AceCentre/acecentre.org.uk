import SvgIcon from "@material-ui/core/SvgIcon";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchIcon from "@material-ui/icons/Search";

import Link from "next/link";
import { Button } from "../button/button";

import { Image } from "../image";
import { Input } from "../input/input";
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
          <NavLink href="/blog">Blog</NavLink>

          <NavLink href="/contact">Contact</NavLink>

          <NavLink href="/my-acecentre">
            <SvgIcon>
              <PersonOutlineOutlinedIcon />
            </SvgIcon>
            My AceCentre
          </NavLink>

          <NavLink href="/checkout">
            <SvgIcon>
              <ShoppingCartOutlinedIcon />
            </SvgIcon>
            Checkout
            {checkoutPostfix}
          </NavLink>

          <NavLink href="tel:0800 080 3115">
            <SvgIcon>
              <PhoneOutlinedIcon />
            </SvgIcon>
            0800 080 3115
          </NavLink>
        </NavList>
        <div className={styles.hideOnMediumScreens}>
          <Input placeholder="Search" maxWidth={213}>
            <SvgIcon>
              <SearchIcon />
            </SvgIcon>
          </Input>
        </div>
        <div className={styles.hideOnMediumScreens}>
          <Button href="/donate" className={styles.donateButton}>
            Donate
          </Button>
        </div>
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

const NavLink = ({ href, children, className }) => {
  return (
    <li className={`${styles.listItem} ${className}`}>
      <Link href={href}>
        <a className={styles.navLink}>{children}</a>
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
            placeOnTop
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
