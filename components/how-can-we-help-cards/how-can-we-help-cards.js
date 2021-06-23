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
            alt="Group of icons to show 'getting started'"
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
            alt="Group of icons to show 'resources'"
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
            alt="Group of icons to show 'AceCentre Learning'"
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
            alt="Group of icons to show 'Assessments'"
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
            alt="Group of icons to show 'Free Advice Line'"
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
  alt,
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
            <div className={styles.imageContainer}>
              <img alt={alt} src={src} className={styles.image} />
            </div>
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
