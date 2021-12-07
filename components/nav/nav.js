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
import { useGlobalProps } from "../../lib/global-props/hook";

export const Nav = ({ nhs, nhsTitle }) => {
  const { loggedInStatus } = useGlobalProps();

  return (
    <FullWidthContainer>
      <InnerContainer>
        <HomeButton nhsTitle={nhsTitle} nhs={nhs} />
        <NavList>
          {!nhs && (
            <>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              <NavLink href="/my-acecentre">
                <SvgIcon>
                  <PersonOutlineOutlinedIcon />
                </SvgIcon>
                {loggedInStatus ? "My Ace Centre" : "Login"}
              </NavLink>

              <NavLink href="/basket">
                <SvgIcon>
                  <ShoppingCartOutlinedIcon />
                </SvgIcon>
                Checkout
              </NavLink>
            </>
          )}

          <NavLink href="tel:0800 080 3115">
            <SvgIcon>
              <PhoneOutlinedIcon />
            </SvgIcon>
            0800 080 3115
          </NavLink>
        </NavList>
        <div className={styles.hideOnMediumScreens}>
          <form action="/search" method="GET">
            <Input name="searchText" placeholder="Search" maxWidth={213}>
              <button
                type="submit"
                className={styles.noStyleButton}
                aria-label="Search"
              >
                <SvgIcon>
                  <SearchIcon />
                </SvgIcon>
              </button>
            </Input>
          </form>
        </div>
        {nhs ? (
          <div className={styles.hideOnMediumScreens}>
            <Button href="/services" className={styles.nhsButton}>
              View all services
            </Button>
          </div>
        ) : (
          <div className={styles.hideOnMediumScreens}>
            <Button href="/get-involved/donate" className={styles.donateButton}>
              Donate
            </Button>
          </div>
        )}
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

const HomeButton = ({ nhs, nhsTitle }) => {
  if (nhs) {
    return <NHSHomeButton title={nhsTitle} />;
  }

  return (
    <div className={styles.homeImage}>
      <Link name="home" href="/">
        <a>
          <Image
            height={152}
            width={290}
            maxHeight={50}
            src={"/nav-logo.png"}
            alt="The Ace Centre logo"
            placeOnTop
          ></Image>
        </a>
      </Link>
    </div>
  );
};

const NHSHomeButton = ({ title = "NHS England Assessment Service" }) => {
  return (
    <div className={styles.homeImage}>
      <Link name="home" href="/">
        <a>
          <Image
            height={118}
            width={293}
            maxHeight={50}
            src={"/nhs-logo.jpg"}
            alt="The NHS logo"
            placeOnTop
          ></Image>
        </a>
      </Link>
      <p className={styles.nhsTitle}>{title}</p>
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
