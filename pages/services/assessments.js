import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

import styles from "../../styles/assessments.module.css";
import Link from "next/link";
import { InformationDays } from "../../components/information-days/information-days";
import { CONTACT_FORM, FormModal } from "../../components/ms-form";

export default function EngineeringPage() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/assessments.jpg"
          alt="Two people talking, one using AAC"
          objectPosition="top"
          heightClass={styles.coverHeight}
        >
          <h1 className={styles.cardTitle}>Assessments</h1>
          <p className={styles.cardDescription}>
            Independent interdisciplinary assessments to identify appropriate
            AAC and AT resources
          </p>
          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButton}>
                <Button onClick={onClick}>Make an online enquiry</Button>
              </div>
            )}
          </FormModal>

          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 080 3115</strong>
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

            <AssessmentEligibility />
            <div className={styles.inlineCard}>
              <h2>
                I am <span className={styles.normalWeight}>eligible for</span>{" "}
                NHS England funded assessments
              </h2>
              <p>
                Learn more about how the Ace Centre can provide assessment,
                provision of equipment and long-term equipment maintenance
                support.
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
                Learn about the Ace Centre&apos;s partnership approach to
                assessment, identifying need, ongoing review and provision of
                support.
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
                  &quot;Ace Centre were amazing, they really helped me
                  communicate and regain my confidence! &quot;
                </p>
              </div>
            </div>

            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <AssignmentIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <h3>NHS England referral form</h3>
                <p>Get the latest Specialised AAC Services Referral Form</p>
                <div className={styles.downloadButtonContainer}>
                  <Button href="/docs/NHS-England-Specialised-AAC-Services-Referral-Form-v5-2021.docx">
                    Download form
                  </Button>
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

export const AssessmentEligibility = ({ nhs = false }) => {
  return (
    <>
      <h2>Am I eligible for an NHS England assessment?</h2>
      <p>
        To be eligible for the NHS England Specialised AAC Services, a person
        must:
      </p>
      <ul className={styles.list}>
        <ListItem nhs={nhs}>Be resident in England</ListItem>
        <ListItem nhs={nhs}>
          Be registered with a GP practice in England
        </ListItem>
        <ListItem nhs={nhs}>
          Have a severe/complex communication difficulty associated with a range
          of physical, cognitive, learning, or sensory deficits
        </ListItem>
        <ListItem nhs={nhs}>
          Have a clear discrepancy between their level of understanding and
          their ability to speak
        </ListItem>
        <ListItem nhs={nhs}>
          Be able to understand the purpose of a communication aid
        </ListItem>
        <ListItem nhs={nhs}>
          Have developed beyond cause and effect understanding
        </ListItem>
        <ListItem nhs={nhs}>
          Link ideas/ semantic categories and syntactic functions beyond basic
          requests.
        </ListItem>
      </ul>
    </>
  );
};

const ListItem = ({ children, nhs = false }) => {
  return (
    <li className={styles.listItem}>
      <Avatar
        className={`${styles.listAvatar} ${
          nhs ? styles.nhsAvatar : styles.normalAvatar
        }`}
      >
        <ChevronRightIcon />
      </Avatar>
      {children}
    </li>
  );
};

export const getStaticProps = withGlobalProps(() => {
  return {
    props: {
      seo: {
        title: "Assessments",
        description:
          "Our assessment and training team will work with the individual, family and involved professionals to identify and achieve goals to support the development of communication and learning, and facilitate greater independence.",
      },
    },
  };
});
