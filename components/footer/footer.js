import Avatar from "@material-ui/core/Avatar";
import SvgIcon from "@material-ui/core/SvgIcon";

import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import PhoneIcon from "@material-ui/icons/Phone";
import Link from "next/link";
import { ImageWithLoader, Image } from "../image";
import styles from "./footer.module.css";

export const Footer = ({ currentYear }) => {
  return (
    <footer className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.topArea}>
          <Image
            alt="The Ace Centre logo"
            height={101}
            width={225}
            maxHeight={100}
            src="/white-logo.png"
            placeOnTop
          />
          <div>
            <Link href="tel:08000803115">
              <a className={styles.phoneNumber}>
                <SvgIcon>
                  <PhoneIcon />
                </SvgIcon>
                0800 080 3115
              </a>
            </Link>
            <p className={styles.officeHours}>
              Office hours, 9AM - 5PM, Monday - Friday
            </p>
            <p className={styles.helpAndSupport}>Help and support:</p>
            <Link href="/contact">
              <a className={styles.helpAndSupportLink}>Contact us</a>
            </Link>
            <Link href="/technical-support">
              <a className={styles.helpAndSupportLink}>Technical Support</a>
            </Link>
          </div>
          <ul className={styles.list}>
            {sitemapList.map((item) => (
              <li key={`sitemap-${item.href}`}>
                <Link href={item.href}>
                  <a className={styles.flatListLink}>{item.title}</a>
                </Link>
              </li>
            ))}
            <li></li>
          </ul>
          <div className={styles.socialsAndCyber}>
            <div className={styles.socialsContainer}>
              <Link href="https://twitter.com/acecentre">
                <a aria-label="Twitter logo" className={styles.avatarLink}>
                  <Avatar className={styles.roundedAvatar}>
                    <TwitterIcon />
                  </Avatar>
                </a>
              </Link>

              <Link href="https://www.youtube.com/user/acecentre">
                <a aria-label="Youtube logo" className={styles.avatarLink}>
                  <Avatar className={styles.roundedAvatar}>
                    <YouTubeIcon />
                  </Avatar>
                </a>
              </Link>
              <Link href="https://www.facebook.com/AceCentre.uk/">
                <a aria-label="Facebook logo" className={styles.avatarLink}>
                  <Avatar className={styles.roundedAvatar}>
                    <FacebookIcon />
                  </Avatar>
                </a>
              </Link>
            </div>
            <div className={styles.cyberEssentialsContainer}>
              <ImageWithLoader
                objectFit="contain"
                layout="fill"
                src="/cyber-essentials.png"
                alt="Cyber essentials plus logo"
              />
            </div>
          </div>
        </div>
        <div className={styles.legalInfoContainer}>
          <p className={styles.legalInfo}>
            Ace Centre is a registered charity no. 1089313. Registered as a
            company limited by guarantee no. 04268143 (England & Wales).
            Registered office: Ace Centre, Hollinwood Business Centre, Albert
            Street, Oldham, OL8 3QL. VAT registration number 785728278
          </p>
        </div>
        <div className={styles.bottomSection}>
          <ul className={styles.flatList}>
            <li className={styles.flatListItem}>
              <Link href="https://mailchi.mp/acecentre/newsletter-signup">
                <a className={styles.flatListLink}>Newsletter</a>
              </Link>
            </li>
            <li className={styles.flatListItem}>
              <Link href="/sitemap">
                <a className={styles.flatListLink}>Sitemap</a>
              </Link>
            </li>
            <li className={styles.flatListItem}>
              <Link href="/page/privacy">
                <a className={styles.flatListLink}>Privacy</a>
              </Link>
            </li>
            <li className={styles.flatListItem}>
              <Link href="/page/cookies">
                <a className={styles.flatListLink}>Cookies</a>
              </Link>
            </li>
            <li className={styles.flatListItem}>
              <Link href="/page/safeguarding-policies">
                <a className={styles.flatListLink}>Safeguarding</a>
              </Link>
            </li>
            <li className={styles.flatListItem}>
              <Link href="/page/copyright-and-licence-terms-for-non-profit-items">
                <a className={styles.flatListLink}>Copyright</a>
              </Link>
            </li>
            <li className={styles.flatListItem}>
              <Link href="/pensions.pdf">
                <a className={styles.flatListLink}>Pensions</a>
              </Link>
            </li>
          </ul>
          <p className={styles.copyright}>
            © Copyright Ace Centre {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

const sitemapList = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Getting started",
    href: "/getting-started",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Ace Centre Learning",
    href: "/learning",
  },
  {
    title: "Get involved",
    href: "/get-involved",
  },
  {
    title: "My Ace Centre",
    href: "/my-acecentre",
  },
];
