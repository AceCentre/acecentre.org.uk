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

const NEWSLETTER_LAST_PATH_KEY = "newsletter-last-path";
const NEWSLETTER_LAST_PATH_AT_KEY = "newsletter-last-path-at";
const NEWSLETTER_LAST_PATH_MAX_AGE_MS = 1000 * 60 * 30; // 30 minutes

export const Nav = ({
  nhs,
  atScholar,
  activityBook,
  nhsTitle,
  noPhoneNumber = false,
}) => {
  const [modelOpen, setModelOpen] = useState(false);
  const [newsletterSource, setNewsletterSource] = useState(undefined);
  const [tags, setTags] = useState([]);
  const { loggedInStatus } = useAuth();
  const { query, asPath } = useRouter();

  useEffect(() => {
    const rawNewsletterValue = Array.isArray(query.newsletter)
      ? query.newsletter[0]
      : query.newsletter;

    if (rawNewsletterValue !== undefined) {
      return;
    }

    const cleanPath = asPath.split("?")[0];
    if (typeof window !== "undefined") {
      window.localStorage.setItem(NEWSLETTER_LAST_PATH_KEY, cleanPath);
      window.localStorage.setItem(
        NEWSLETTER_LAST_PATH_AT_KEY,
        Date.now().toString(),
      );
    }
  }, [query.newsletter, asPath]);

  useEffect(() => {
    const rawNewsletterValue = Array.isArray(query.newsletter)
      ? query.newsletter[0]
      : query.newsletter;
    const cleanPath = asPath.split("?")[0];
    setModelOpen(rawNewsletterValue !== undefined);

    if (rawNewsletterValue === undefined) {
      setNewsletterSource(undefined);
      setTags([]);
      return;
    }

    if (rawNewsletterValue !== "1") {
      setNewsletterSource("cta");
      setTags([{ name: rawNewsletterValue }]);
      return;
    }

    if (cleanPath === "/") {
      setNewsletterSource("cta");
      setTags([{ name: "homepage" }]);
      return;
    }

    if (cleanPath === "/resources") {
      let inferredSlug = "";
      let slugSource = "none";

      if (typeof window !== "undefined") {
        const lastPath =
          window.localStorage.getItem(NEWSLETTER_LAST_PATH_KEY) || "";
        const lastPathAt = Number(
          window.localStorage.getItem(NEWSLETTER_LAST_PATH_AT_KEY) || "0",
        );
        const isFresh = Date.now() - lastPathAt <= NEWSLETTER_LAST_PATH_MAX_AGE_MS;

        if (isFresh && lastPath.startsWith("/resources/")) {
          inferredSlug = lastPath.split("/").filter(Boolean)[1] || "";
          slugSource = "localStorage";
        }
      }

      if (!inferredSlug) {
        const referrer = document.referrer || "";
        try {
          const referrerUrl = new URL(referrer);
          const referrerPath = referrerUrl.pathname || "";
          if (referrerPath.startsWith("/resources/")) {
            inferredSlug = referrerPath.split("/").filter(Boolean)[1] || "";
            slugSource = "referrer";
          }
        } catch (error) {
          inferredSlug = "";
        }
      }

      console.log("[newsletter-cta-debug]", {
        cleanPath,
        inferredSlug: inferredSlug || "resources",
        slugSource,
      });

      setNewsletterSource("cta");
      setTags(inferredSlug ? [{ name: inferredSlug }] : [{ name: "resources" }]);
      return;
    }

    if (cleanPath.startsWith("/resources/")) {
      const slug = cleanPath.split("/").filter(Boolean)[1];
      setNewsletterSource("cta");
      setTags(slug ? [{ name: slug }] : [{ name: "resources" }]);
      return;
    }

    if (cleanPath === "/learning" || cleanPath.startsWith("/learning/")) {
      setNewsletterSource("cta");
      setTags([{ name: "learning" }]);
      return;
    }

    setNewsletterSource("cta");
    setTags([]);
  }, [query.newsletter, asPath]);

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
        <InnerContainer
          className={activityBook ? styles.activityBookContainer : ""}
        >
          <HomeButton
            nhsTitle={nhsTitle}
            nhs={nhs}
            atScholar={atScholar}
            activityBook={activityBook}
          />
          <NavList>
            {!nhs && !atScholar && !activityBook && (
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
          {nhs && (
            <div className={styles.hideOnMediumScreens}>
              <Button href="/services" className={styles.nhsButton}>
                View all services
              </Button>
            </div>
          )}

          {atScholar && (
            <>
              <div className={styles.hideOnMediumScreens}>
                <Button href="/" className={styles.donateButton}>
                  Ace Centre Home
                </Button>
              </div>
            </>
          )}

          {activityBook && (
            <div className={styles.hideOnMediumScreens}>
              <Button href="/" className={styles.donateButton}>
                Ace Centre Home
              </Button>
            </div>
          )}

          {!nhs && !atScholar && !activityBook && (
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

const HomeButton = ({ nhs, nhsTitle, atScholar, activityBook }) => {
  if (nhs) {
    return <NHSHomeButton title={nhsTitle} />;
  }

  if (atScholar) {
    return <ATScholarHomeButton></ATScholarHomeButton>;
  }

  if (activityBook) {
    return (
      <div className={`${styles.homeImage} ${styles.activityBookLogo}`}>
        <Link name="home" href="/">
          <Image
            height={304}
            width={980}
            maxHeight={100}
            src={"/activity-book/activity-book-logo.png"}
            alt="FUNctional Switching logo"
            placeOnTop
            priority={true}
          ></Image>
        </Link>
      </div>
    );
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
      <p className={styles.nhsSubtitle}>
        North West and Thames Valley & Wessex
      </p>
    </div>
  );
};

const ATScholarHomeButton = () => {
  return (
    <div className={styles.homeImage}>
      <Link name="home" href="/">
        <Image
          height={720}
          width={1800}
          maxHeight={100}
          src={"/at-scholar-logo2.png"}
          alt="The AT Scholar logo"
          placeOnTop
        ></Image>
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
