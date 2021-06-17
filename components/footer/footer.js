import { SvgIcon } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import Link from "next/link";
import { Image } from "../image";
import styles from "./footer.module.css";

export const Footer = ({ currentYear }) => {
  return (
    <footer className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.topArea}>
          <Image
            alt="The AceCentre logo"
            height={105}
            width={225}
            maxHeight={100}
            src="/white-logo.png"
            placeOnTop
          />
          <div>
            <Link href="tel:08000487642">
              <a className={styles.phoneNumber}>
                <SvgIcon>
                  <PhoneIcon />
                </SvgIcon>
                0800 048 7642
              </a>
            </Link>
            <p className={styles.officeHours}>Office hours, Monday - Friday</p>
            <p className={styles.helpAndSupport}>Help and support:</p>
            <Link href="/contact">
              <a className={styles.helpAndSupportLink}>Contact us</a>
            </Link>
            <Link href="/support">
              <a className={styles.helpAndSupportLink}>Technical Support</a>
            </Link>
          </div>
          <ul className={styles.list}>
            {sitemapList.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <a className={styles.flatListLink}>{item.title}</a>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.socialsContainer}>
            <p className={styles.phoneNumber}>Socials</p>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <ul className={styles.flatList}>
            <li className={styles.flatListItem}>
              <Link href="/newsletter">
                <a className={styles.flatListLink}>Newsletter</a>
              </Link>
            </li>
            <li className={styles.flatListItem}>
              <Link href="/sitemap">
                <a className={styles.flatListLink}>Sitemap</a>
              </Link>
            </li>
            <li className={styles.flatListItem}>
              <Link href="/privacy-policy">
                <a className={styles.flatListLink}>Privacy Policy</a>
              </Link>
            </li>
            <li className={styles.flatListItem}>
              <Link href="/safeguarding">
                <a className={styles.flatListLink}>Safeguarding</a>
              </Link>
            </li>
          </ul>
          <p className={styles.copyright}>
            © Copyright AceCentre {currentYear}
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
    href: "/acecentre-learning",
  },
  {
    title: "Get involved",
    href: "/get-involved",
  },
  {
    title: "My AceCentre",
    href: "/my-acecentre",
  },
];
