import Link from "next/link";
import { Image } from "../image";
import styles from "./footer.module.css";

export const Footer = ({ currentYear }) => {
  return (
    <footer className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.topArea}>
          <Image height={152} width={290} maxHeight={100} src="/nav-logo.png" />
          <div>
            <p>0800 048 7642</p>
            <p>Office hours, Monday - Friday</p>
            <p>
              Call the helpline on <span>0800 080 3115</span>
            </p>
          </div>
          <ul className={styles.list}>
            {sitemapList.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.bottomSection}>
          <ul className={styles.flatList}>
            <li className={styles.flatListItem}>
              <Link href="/newsletter">Newsletter</Link>
            </li>
            <li className={styles.flatListItem}>
              <Link href="/sitemap">Sitemap</Link>
            </li>
            <li className={styles.flatListItem}>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className={styles.flatListItem}>
              <Link href="/safeguarding">Safeguarding</Link>
            </li>
          </ul>
          <p>© Copyright AceCentre {currentYear}</p>
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
