import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import ListAltIcon from "@material-ui/icons/ListAlt";
import { CardHighlight } from "../../components/project-highlight/project-highlight";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import { Avatar } from "@material-ui/core";
import { Image } from "../../components/image";

import styles from "../../styles/nhs-assessment.module.css";
import { getSimpleStory } from "../../lib/story/get-story";
import { FeaturedStory } from "../../components/featured-story/featured-story";
import { InformationDays } from "../../components/information-days/information-days";

export default function EngineeringPage({ featuredStory }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} nhs />
      </header>
      <main>
        <VideoWithCardCover
          src="/services/nhs-assessment-cover.jpg"
          alt="A child laughing"
        >
          <h1 className={styles.cardTitle}>NHS England Assessment</h1>
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
            <h2>NHS England assessments</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2>The referral form</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2>Video support</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2>Prior to the assessment</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2>Who should be involved?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </p>
            <h2>The venue</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </p>
            <h2>Length of assessment</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </p>
            <h2>What happens at the assessment?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </p>
            <h2>Following the assessment</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </p>
            <CardHighlight
              title="Check where our services are available"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              viewText="Launch service checker"
              href="https://servicefinder.acecentre.net/"
            />
          </div>
          <div>
            <div className={styles.serviceProvidedByContainer}>
              <p>Service provided by:</p>
              <Image
                height={152}
                width={290}
                maxHeight={90}
                src={"/nav-logo.png"}
                alt="The AceCentre logo"
              ></Image>
            </div>
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
                <ListAltIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>NHS England referral form</strong>
                </p>
                <p>
                  Ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tem por incididunt olor sit.
                </p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    href="https://acecentre.org.uk/wp-content/uploads/2021/02/NHS-England-Specialised-AAC-Services-Referral-Form-v3.2-2021.docx"
                  >
                    Download form
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InformationDays />
        <FeaturedStory {...featuredStory} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const featuredStory = await getSimpleStory("paul");

  return {
    props: { featuredStory },
  };
});
