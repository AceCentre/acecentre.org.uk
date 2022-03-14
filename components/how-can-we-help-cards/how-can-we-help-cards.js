import Avatar from "@material-ui/core/Avatar";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Link from "next/link";
import styles from "./how-can-we-help-cards.module.css";
import { ImageWithLoader as Image } from "../image";

export const HowCanWeHelpCards = () => {
  return (
    <div className={styles.container}>
      <p className={styles.handwriting}>We&apos;re here for you</p>
      <h1>How We Help</h1>
      <div className={styles.allCards}>
        <div className={styles.gettingStarted}>
          <HowWeHelpCard
            src="/graphics/getting-started.svg"
            background="rgba(0,0,0,0)"
            headline="Getting started with AAC and AT"
            secondaryLine="Learn more with our guides to getting started"
            href="/getting-started"
            iconColour="#E3BEBD"
            alt="Group of icons to show 'getting started'"
          />
        </div>
        <div className={styles.resources}>
          <HowWeHelpCard
            src="/graphics/resources.svg"
            background="rgba(0,0,0,0)"
            headline="Resources"
            secondaryLine="A collection of AAC and AT resources created by the Ace Centre"
            href="/resources"
            iconColour="#F4DF74"
            alt="Group of icons to show 'resources'"
          />
        </div>

        <div className={styles.aceCentreLearning}>
          <HowWeHelpCard
            src="/graphics/learning.svg"
            background="rgba(0,0,0,0)"
            headline="Ace Centre Learning"
            secondaryLine="Find the right training for your specific needs"
            href="/learning"
            iconColour="#8AD9CA"
            alt="Group of icons to show 'AceCentre Learning'"
          />
        </div>
        <div className={styles.assessment}>
          <HowWeHelpCard
            src="/graphics/assessment.svg"
            background="rgba(0,0,0,0)"
            headline="Assessments"
            secondaryLine="We offer independent interdisciplinary assessments"
            href="/services/assessments"
            iconColour="#F2AB3F"
            alt="Group of icons to show 'Assessments'"
          />
        </div>
        <div className={styles.helpline}>
          <HowWeHelpCard
            src="/graphics/helpline.svg"
            background="rgba(0,0,0,0)"
            headline="Free Advice Line"
            secondaryLine="Call us on 0800 080 3115
            Office hours, 9AM - 5PM, Monday - Friday"
            href="/contact"
            alt="Group of icons to show 'Free Advice Line'"
            iconColour="#5AA8D1"
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
            <div className={styles.cardImageContainer}>
              <Image alt={alt} src={src} layout="fill" objectFit="contain" />
            </div>
            {iconColour && (
              <Avatar
                style={{ backgroundColor: iconColour }}
                className={styles.arrowAvatar}
              >
                <ArrowForward className={styles.arrowIcon} />
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
