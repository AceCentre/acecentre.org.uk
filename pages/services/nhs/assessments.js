import { Button } from "../../../components/button/button";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";

import ListAltIcon from "@material-ui/icons/ListAlt";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import { Avatar } from "@material-ui/core";
import { Image } from "../../../components/image";

import styles from "../../../styles/nhs-assessment.module.css";
import { getSimpleStory } from "../../../lib/story/get-story";
import { FeaturedStory } from "../../../components/featured-story/featured-story";
import { InformationDays } from "../../../components/information-days/information-days";
import Link from "next/link";

export default function NHSLanding({ featuredStory }) {
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
          nhs
        >
          <h1 className={styles.cardTitle}>NHS England Assessment</h1>
          <p className={styles.cardDescription}>
            Specialist AAC Service supporting the North West and Thames Valley &
            Wessex regions
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
              If you meet criteria and your permanent place of residence is in
              the North West or the Thames Valley & Wessex regions, you can
              apply to Ace Centre for assessment, provision of equipment and
              long-term maintenance support.
            </p>
            <p>
              If you live outside the North West or Thames Valley & Wessex
              regions, you will need to contact the NHS Specialised AAC Service
              operating in your region.{" "}
              <Link href="http://www.communicationmatters.org.uk/page/contacts-assessment-services-all">
                Click here to find out which service you need to contact
              </Link>
            </p>
            <p>
              <Link href="/docs/NhsEligibilityAce.pdf">
                Further information on the NHS England Eligibility criteria can
                be found in this document
              </Link>
            </p>
            <h2>The referral form</h2>
            <ul>
              <li>Please use the forms below to make a referral.</li>
              <li>
                Read all guidance documentation and complete all fields in order
                to avoid delay
              </li>
              <li>
                If possible, referral forms should be completed by a Speech and
                Language Therapist or someone knowledgeable in the field of AAC.
              </li>
              <li>
                Please note: any referral forms received without a valid NHS
                Number and full GP details cannot be accepted.
              </li>
            </ul>
            <p>
              <Link href="/docs/NHS-England-Specialised-AAC-Services-Referral-Form-v3.2-2021.docx">
                Download our NHS England Specialised AAC Services Referral Form
                (Word format)
              </Link>
            </p>
            <p>
              <Link href="/docs/Ace-Centre-Guidance-Notes-V3-2019-with-appendices.pdf">
                Please read the guidance document for the form.
              </Link>
            </p>
            <p>
              It is important to use the latest version of the NHS Referral Form
              – this is currently v3.2 2021. The latest version of this form,
              and the corresponding Guidance Notes, will always be accessible
              from this page.
            </p>
            <h2>Equipment Only Requests</h2>
            <p>
              <Link href="/docs/Equipment-Only-Request-Form-v-180118-3.docx">
                Please complete an Equipment Only Request Form
              </Link>{" "}
              if you, or the team working with you, are confident you know the
              best AAC system. This means you do not need a full assessment from
              Ace Centre.
            </p>
            <p>
              <Link href="/docs/Equipment-Only-Request-Form-Guidance-Notes-v181217.pdf">
                Please read the guidance document
              </Link>{" "}
              for the form. It is expected that you will have trialled at least
              three systems and gained enough clinical information to enable you
              to complete all relevant fields on the form.
            </p>
            <h2>More Information</h2>
            <p>
              Ace Centre will acknowledge all referrals in writing within 10
              days of receipt.
            </p>
            <p>
              The acknowledgment will be sent to the main contact on the
              submitted form and will advise on eligibility for the requested
              service or notify the contact that further information is
              required.
            </p>
            <p>
              Please note: If someone does not meet the eligibility criteria
              they should contact the Ace Centre to find out the many other ways
              we can offer support.
            </p>
            <p>
              Environmental control and computer access needs should be met by
              the relevant commissioned service.{" "}
              <Link href="http://www.communicationmatters.org.uk/page/aac-commissioning-england">
                For information on those services please see here.
              </Link>
            </p>
            <p>
              If you have questions or difficulty downloading any of these
              documents, please contact our free helpline on 0800 080 3115
            </p>
            {/* Commenting this out because its broken */}
            {/* <CardHighlight
              title="Check where our services are available"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              viewText="Launch service checker"
              href="https://servicefinder.acecentre.net/"
            /> */}
          </div>
          <div>
            <div className={styles.serviceProvidedByContainer}>
              <p>Service provided by:</p>
              <Image
                height={152}
                width={290}
                maxHeight={90}
                src={"/nav-logo.png"}
                alt="The Ace Centre logo"
              ></Image>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;You addressed so many of the issues and concerns. Thank
                  you so much for your expert knowledge and advice.&quot;
                </p>
                <div>
                  <p>
                    <strong>Lois, SaLT, West Berkshire</strong>
                  </p>
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
                <p>Get the latest Specialised AAC Services Referral Form</p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    href="/docs/NHS-England-Specialised-AAC-Services-Referral-Form-v3.2-2021.docx"
                  >
                    Download form
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InformationDays />
        <FeaturedStory nhs {...featuredStory} />
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
