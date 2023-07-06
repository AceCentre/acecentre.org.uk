import Avatar from "@material-ui/core/Avatar";
import SvgIcon from "@material-ui/core/SvgIcon";

import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import PhoneIcon from "@material-ui/icons/Phone";
import Link from "next/link";
import { ImageWithLoader, Image } from "../image";
import styles from "./footer.module.css";
import { NewsletterSignup } from "../resources-download/resources-download";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useState } from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

export const NewsletterModal = ({
  modelOpen,
  onClose,
  signUpIdentifier = "footer",
  tags = [],
}) => {
  return (
    <Modal
      scrollBehavior="inside"
      size="3xl"
      isCentered
      isOpen={modelOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody style={{ padding: "2rem" }}>
          <div className={styles.topSection}>
            <h2>Ace Centre Newsletter</h2>
            <p>
              Sign up to our free newsletter to stay up to date with the latest
              news from Ace Centre
            </p>
          </div>

          <div className={styles.newsletterContainer}>
            <NewsletterSignup
              withNames
              signUpIdentifier={signUpIdentifier}
              tags={tags}
            />
          </div>
          <div className={styles.bottomContainer}>
            <button className={styles.closeButton} onClick={onClose}>
              Close window
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const Footer = ({ currentYear, noPhoneNumber = false }) => {
  const [modelOpen, setModelOpen] = useState(false);

  const onClose = () => setModelOpen(false);

  return (
    <>
      <NewsletterModal modelOpen={modelOpen} onClose={onClose} />

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
            {noPhoneNumber === false && (
              <div>
                <Link href="tel:08000803115" className={styles.phoneNumber}>
                  <SvgIcon>
                    <PhoneIcon />
                  </SvgIcon>
                  0800 080 3115
                </Link>
                <p className={styles.officeHours}>
                  Office hours, 9AM - 5PM, Monday - Friday
                </p>
                <p className={styles.helpAndSupport}>Help and support:</p>
                <Link href="/contact" className={styles.helpAndSupportLink}>
                  Contact us
                </Link>
                <Link
                  href="/technical-support"
                  className={styles.helpAndSupportLink}
                >
                  Technical Support
                </Link>
              </div>
            )}
            <ul className={styles.list}>
              {sitemapList.map((item) => (
                <li key={`sitemap-${item.href}`}>
                  <Link href={item.href} className={styles.flatListLink}>
                    {item.title}
                  </Link>
                </li>
              ))}
              <li></li>
            </ul>
            <div className={styles.socialsAndCyber}>
              <div className={styles.socialsContainer}>
                <Link
                  href="https://www.linkedin.com/company/ace-centre/"
                  aria-label="LinkedIn Logo"
                  className={styles.avatarLink}
                >
                  <Avatar className={styles.roundedAvatar}>
                    <LinkedInIcon />
                  </Avatar>
                </Link>

                <Link
                  href="https://www.instagram.com/acecentreuk"
                  aria-label="Instagram Logo"
                  className={styles.avatarLink}
                >
                  <Avatar className={styles.roundedAvatar}>
                    <InstagramIcon />
                  </Avatar>
                </Link>

                <Link
                  href="https://twitter.com/acecentre"
                  aria-label="Twitter logo"
                  className={styles.avatarLink}
                >
                  <Avatar className={styles.roundedAvatar}>
                    <TwitterIcon />
                  </Avatar>
                </Link>

                <Link
                  href="https://www.youtube.com/user/acecentre"
                  aria-label="Youtube logo"
                  className={styles.avatarLink}
                >
                  <Avatar className={styles.roundedAvatar}>
                    <YouTubeIcon />
                  </Avatar>
                </Link>
                <Link
                  href="https://www.facebook.com/AceCentre.uk/"
                  aria-label="Facebook logo"
                  className={styles.avatarLink}
                >
                  <Avatar className={styles.roundedAvatar}>
                    <FacebookIcon />
                  </Avatar>
                </Link>
              </div>
              <div className={styles.logoContainer}>
                <div className={styles.cyberEssentialsContainer}>
                  <ImageWithLoader
                    objectFit="contain"
                    layout="fill"
                    src="/cyber-essentials.png"
                    alt="Cyber essentials plus logo"
                  />
                </div>
                <div className={styles.cyberEssentialsContainer}>
                  <ImageWithLoader
                    objectFit="contain"
                    layout="fill"
                    src="/ca-logo.png"
                    alt="Communication Access Logo"
                  />
                </div>
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
                <a
                  href="#"
                  onClick={() => setModelOpen(true)}
                  className={styles.flatListLink}
                >
                  Newsletter
                </a>
              </li>
              <li className={styles.flatListItem}>
                <Link href="/sitemap" className={styles.flatListLink}>
                  Sitemap
                </Link>
              </li>
              <li className={styles.flatListItem}>
                <Link href="/page/privacy" className={styles.flatListLink}>
                  Privacy
                </Link>
              </li>
              <li className={styles.flatListItem}>
                <Link href="/page/cookies" className={styles.flatListLink}>
                  Cookies
                </Link>
              </li>
              <li className={styles.flatListItem}>
                <Link
                  href="/page/safeguarding-policies"
                  className={styles.flatListLink}
                >
                  Safeguarding
                </Link>
              </li>
              <li className={styles.flatListItem}>
                <Link
                  href="/page/copyright-and-licence-terms-for-non-profit-items"
                  className={styles.flatListLink}
                >
                  Copyright
                </Link>
              </li>
              <li className={styles.flatListItem}>
                <Link href="/pensions.pdf" className={styles.flatListLink}>
                  Pensions
                </Link>
              </li>
            </ul>
            <p className={styles.copyright}>
              © Copyright Ace Centre {currentYear}
            </p>
          </div>
        </div>
      </footer>
    </>
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
