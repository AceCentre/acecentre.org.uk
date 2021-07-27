import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Avatar } from "@material-ui/core";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

import styles from "../../styles/assessments.module.css";
import Link from "next/link";
import { InformationDays } from "../../components/information-days/information-days";

export default function EngineeringPage() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <VideoWithCardCover
          src="/services/engineering.jpg"
          alt="An engineering using a 3D printer"
        >
          <h1 className={styles.cardTitle}>Assessments</h1>
          <p className={styles.cardDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore.
          </p>
          <Button className={styles.cardButton}>Make an online enquiry</Button>
          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 048 7642</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>About our assessments</h2>
            <p>
              Our assessment and training team will work with the individual,
              family and involved professionals to identify and achieve goals to
              support the development of communication and learning, and
              facilitate greater independence.
            </p>
            <h2>Type of assessments</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
            <p>
              Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod
            </p>

            <h2>Am I eligible for an NHS England assessment?</h2>
            <p>
              To be eligible for the NHS England Specialised AAC Services, a
              person must:
            </p>
            <ul className={styles.list}>
              <ListItem>Be resident in England</ListItem>
              <ListItem>Be registered with a GP practice in England</ListItem>
              <ListItem>
                Have a severe/complex communication difficulty associated with a
                range of physical, cognitive, learning, or sensory deficits
              </ListItem>
              <ListItem>
                Have a clear discrepancy between their level of understanding
                and their ability to speak
              </ListItem>
              <ListItem>
                Be able to understand the purpose of a communication aid
              </ListItem>
              <ListItem>
                Have developed beyond cause and effect understanding
              </ListItem>
              <ListItem>
                Link ideas/ semantic categories and syntactic functions beyond
                basic requests.
              </ListItem>
            </ul>

            <div className={styles.inlineCard}>
              <h2>
                I am <span className={styles.normalWeight}>eligible for</span>{" "}
                NHS England funded assessments
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt olor sit amet, consectetur adit labore
                et dolore magna aliqua.
              </p>
              <Link href="/services/nhs/assessments">
                <a className={styles.link}>View service &gt;</a>
              </Link>
            </div>
            <div className={styles.inlineCard}>
              <h2>
                <span className={styles.normalWeight}>I’m</span> not{" "}
                <span className={styles.normalWeight}>eligible for</span> NHS
                England funded assessments
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt olor sit amet, consectetur adit labore
                et dolore magna aliqua.
              </p>
              <Link href="/services/self-funded-assessments">
                <a className={styles.link}>View service &gt;</a>
              </Link>
            </div>
          </div>

          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod consectetur adipiscing elit, sed do
                  eiusmodtempor incididunt &quot;
                </p>
                <div>
                  <p>
                    <strong>Anna Reeves DL</strong>
                  </p>
                  <p>CEO</p>
                </div>
              </div>
            </div>

            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <h3>Self-assessment referral form</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt olor sit.
                </p>
                <div className={styles.downloadButtonContainer}>
                  <Button>Download form</Button>
                </div>
              </div>
            </div>

            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <h3>NHS England referral form</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt olor sit.
                </p>
                <div className={styles.downloadButtonContainer}>
                  <Button>Download form</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InformationDays />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const ListItem = ({ children }) => {
  return (
    <li className={styles.listItem}>
      <Avatar className={styles.listAvatar}>
        <ChevronRightIcon />
      </Avatar>
      {children}
    </li>
  );
};

export const getStaticProps = withGlobalProps();
