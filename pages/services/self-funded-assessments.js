import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import { Avatar } from "@material-ui/core";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

import styles from "../../styles/assessments.module.css";
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
          src="/self-funded-assessments.jpg"
          alt="An Ace Centre staff member showing a client how to use their device"
          objectPosition="center"
        >
          <h1 className={styles.cardTitle}>Self-funded assessments</h1>
          <p className={styles.cardDescription}>
            Working with the individual, family and involved professionals to
            identify and achieve goals to support the development of
            communication, learning, and greater independence.
          </p>
          <Button className={styles.cardButton}>Make an online enquiry</Button>
          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 048 7642</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>Self-funded assessments</h2>
            <p>
              Before you start this process we do encourage you to make contact
              with your local AAC team for support. If you are unsure how to
              access your local AAC team, please ring our free telephone advice
              line on 0800 080 3115 and we will try to help you to identify an
              appropriate contact point in your area.
            </p>
            <p>
              If you plan to go with an Ace Centre self-funded assessment
              service we recommend you attend a free one-hour information day
              appointment. These appointments are a useful first step in any
              effective assessment process.
            </p>
            <p>
              We offer independent interdisciplinary assessments to identify
              appropriate assistive technology resources for people with
              physical and/or communication impairments to support their
              communication and learning.
            </p>
            <p>
              We recognise the benefits of a partnership approach when
              completing assessments. Very few people manage effectively in
              isolation, and we encourage individuals, their families and
              involved professionals to work together as a team – from the very
              first step of identifying a need, through to the ongoing review
              and provision of support needed for each individual to achieve
              their long-term goals.
            </p>
            <p>
              If significant others are not involved in the assessment process,
              this can lead to problems such as a lack of funding, inappropriate
              recommendations for equipment, training and support, and/or a
              failure in implementation. The end result is that the intervention
              does not succeed, and the individual is unable to move forward.
            </p>
            <p>
              For these reasons, Ace Centre likes the ‘team’ to be identified
              from the beginning of the process: Our main objective is to
              facilitate closer working with the team to identify and achieve
              common and realistic goals.
            </p>
            <p>
              Our assessment and training teams consist of Occupational
              Therapists, Speech and Language Therapists, Teachers and
              Technicians.
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
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;It helps to have specialist input from teams like yours
                  to steer us in the right direction &quot;
                </p>
                <div>
                  <p>
                    <strong>Mum of little girl new to AAC</strong>
                  </p>
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
          </div>
        </div>
        <InformationDays />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps();
