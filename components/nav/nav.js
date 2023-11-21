import SvgIcon from "@mui/material/SvgIcon";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";

import Link from "next/link";
import { Button } from "../button/button";

import { Image } from "../image";
import { Input } from "../input/input";
import styles from "./nav.module.css";
import { useEffect, useState } from "react";
import { NewsletterModal } from "../footer/footer";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/auth-hook";

export const Nav = ({ nhs, nhsTitle, noPhoneNumber = false }) => {
  const [modelOpen, setModelOpen] = useState(false);
  const [newsletterSource, setNewsletterSource] = useState(undefined);
  const [tags, setTags] = useState([]);
  const { loggedInStatus } = useAuth();
  const { query } = useRouter();

  useEffect(() => {
    setModelOpen(query.newsletter !== undefined);
    setNewsletterSource(query.newsletter);

    if (query.newsletter !== "1") {
      setTags([{ name: query.newsletter }]);
    }
  }, [query.newsletter]);

  const onClose = () => setModelOpen(false);

  return (
    <>
      <NewsletterModal
        modelOpen={modelOpen}
        onClose={onClose}
        signUpIdentifier={newsletterSource || "pop-over"}
        tags={tags}
      />
      <FullWidthContainer>
        <InnerContainer>
          <HomeButton nhsTitle={nhsTitle} nhs={nhs} />
          <NavList>
            {!nhs && (
              <>
                <NavLink href="/blog">Blog</NavLink>
                <NavLink href="/feedback">Feedback</NavLink>
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

            {noPhoneNumber === false && (
              <NavLink href="tel:0800 080 3115">
                <SvgIcon>
                  <PhoneOutlinedIcon />
                </SvgIcon>
                0800 080 3115
              </NavLink>
            )}
          </NavList>
          <div className={styles.hideOnMediumScreens}>
            <form action="/search" method="GET">
              <Input
                name="searchText"
                ariaLabel="Search text"
                placeholder="Search"
                maxWidth={213}
              >
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
              <Button
                href="/get-involved/donate"
                className={styles.donateButton}
              >
                Donate
              </Button>
            </div>
          )}
        </InnerContainer>
      </FullWidthContainer>
    </>
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
      <Link href={href} className={styles.navLink}>
        {children}
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
        <Image
          height={152}
          width={290}
          maxHeight={50}
          src={"/nav-logo.png"}
          alt="The Ace Centre logo"
          placeOnTop
          priority={true}
        ></Image>
      </Link>
    </div>
  );
};

const NHSHomeButton = ({ title = "NHS England Assessment Service" }) => {
  return (
    <div className={styles.homeImage}>
      <Link name="home" href="/">
        <Image
          height={118}
          width={293}
          maxHeight={50}
          src={"/nhs-logo.jpg"}
          alt="The NHS logo"
          placeOnTop
        ></Image>
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
