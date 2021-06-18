import { Avatar } from "@material-ui/core";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Link from "next/link";
import styles from "./how-can-we-help-cards.module.css";

export const HowCanWeHelpCards = () => {
  return (
    <div className={styles.container}>
      <p className={styles.handwriting}>We&apos;re here for you</p>
      <h1>How We Help</h1>
      <div className={styles.allCards}>
        <div className={styles.gettingStarted}>
          <HowWeHelpCard
            src="/getting-started.svg"
            background="#F1D1D0"
            headline="Getting started with AAC and AT"
            secondaryLine="New to AAC and AT? Learn more with our guide to getting started"
            href="/getting-started"
            iconColour="#E3BEBD"
          />
        </div>
        <div className={styles.resources}>
          <HowWeHelpCard
            src="/resources.svg"
            background="#F6EEC5"
            headline="Resources"
            secondaryLine="Resources to help you get started with AAC, free symbol & alphabet charts"
            href="/resources"
            iconColour="#F4DF74"
          />
        </div>

        <div className={styles.aceCentreLearning}>
          <HowWeHelpCard
            src="/acecentre-learning.svg"
            background="#B0E8DE"
            headline="AceCentre Learning"
            secondaryLine="Find the right training for your specific needs"
            href="/acecentre-learning"
            iconColour="#8AD9CA"
          />
        </div>
        <div className={styles.assessment}>
          <HowWeHelpCard
            src="/assessments.svg"
            background="#F4D4A4"
            headline="Assessments"
            secondaryLine="We offer independent interdisciplinary assessments"
            href="/assessments"
            iconColour="#F2AB3F"
          />
        </div>
        <div className={styles.helpline}>
          <HowWeHelpCard
            src="/advice-line.svg"
            background="#BFDDED"
            headline="Free Advice Line"
            secondaryLine="Call us on 0800 048 7642
            Office hours, Monday - Friday"
            href="tel:08000487642"
          />
        </div>
      </div>
    </div>
  );
};

const HowWeHelpCard = ({
  src,
  background,
  headline,
  secondaryLine,
  href,
  iconColour,
}) => {
  return (
    <>
      <style jsx>{`
        .imageBackground {
          background-color: ${background};
          max-height: 239px;
          height: 100%;
          position: relative;
        }
      `}</style>
      <Link href={href}>
        <a className={styles.cardContainer}>
          <div className="imageBackground">
            <img className={styles.cardImage} src={src} />
            {iconColour && (
              <Avatar
                style={{ backgroundColor: iconColour }}
                className={styles.arrowAvatar}
              >
                <ArrowForward />
              </Avatar>
            )}
          </div>
          <div className={styles.bottomSection}>
            <p className={styles.cardHeadline}>{headline}</p>
            <p>{secondaryLine}</p>
          </div>
        </a>
      </Link>
    </>
  );
};
