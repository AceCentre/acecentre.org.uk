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
// import { FeaturedStory } from "../../../components/featured-story/featured-story";
import { InformationDays } from "../../../components/information-days/information-days";
import Link from "next/link";
import { AssessmentEligibility } from "../assessments";
import { CONTACT_FORM, FormModal } from "../../../components/ms-form";

export default function NHSLanding() {
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
          heightClass={styles.coverHeight}
        >
          <h1 className={styles.cardTitle}>NHS England Assessment</h1>
          <p className={styles.cardDescription}>
            Specialist AAC Service supporting the North West and Thames Valley &
            Wessex regions
          </p>
          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButtonContainer}>
                <Button onClick={onClick} className={styles.cardButton}>
                  Make an online enquiry
                </Button>
              </div>
            )}
          </FormModal>

          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 080 3115</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>NHS England assessments</h2>
            <p>
              Ace Centre is commissioned by NHS England to provide{" "}
              <Link href="https://www.england.nhs.uk/commissioning/wp-content/uploads/sites/12/2016/03/aac-serv-spec-jan-2016.pdf">
                specialised AAC services
              </Link>{" "}
              across the North West and Wessex & Thames Valley NHSE specialised
              commissioning regions. These services are for children and adults
              who need AAC and meet{" "}
              <Link href="/docs/NHS Eligibility guidance and decision chart.pdf">
                NHSE eligibility criteria.
              </Link>
            </p>

            <AssessmentEligibility nhs />
            <p>
              If you don&apos;t fit this criteria you can still get an Ace
              Centre assessment.{" "}
              <Link href="/services/assessments">
                See our self-funded assessments page for more details.
              </Link>
            </p>

            <h2>The referral form</h2>
            <p>
              Referrals for an assessment are accepted for people who meet NHSE
              eligibility criteria from publicly funded health, education and
              social care professionals. Please read our{" "}
              <Link href="/docs/Ace-Centre-Guidance-Notes-V3-2019-with-appendices.pdf">
                guidance documentation
              </Link>{" "}
              and complete all sections with detailed information and supporting
              evidence using this{" "}
              <Link href="/docs/NHS-England-Specialised-AAC-Services-Referral-Form-v3.2-2021.docx">
                referral form.
              </Link>
            </p>

            <h2>Video support</h2>
            <p>
              A recent video of the individual is requested to support the
              referral. This will help the assessment and training team to plan
              for the assessment and determine what equipment may be required.
              Ideally, the video should aim to show the individual:
            </p>
            <ul>
              <li>
                Interacting and communicating with others (showing any resources
                they use)
              </li>
              <li>Accessing a computer or other technology</li>
              <li>
                Completing activities that demonstrate the physical movements
                they are capable of
              </li>
              <li>In the typical range of positions they work in</li>
            </ul>
            <p>
              Further information can be found in our{" "}
              <a href="/Video Guidelines.docx">Video Guidelines Form.</a>
            </p>
            <h2>Prior to the assessment</h2>
            <p>
              Once your completed referral form has been received and accepted
              as eligible for Specialised BNHSE AAC services it will be
              allocated to two members of the assessment and training team who
              will complete the assessment. They will then make the necessary
              arrangements for the assessment and confirm this in writing to the
              individual being referred and their referrer.
            </p>
            <h2>Who should be involved?</h2>
            <p>
              Ace Centre recognises and values the benefits of a partnership
              approach when completing assessments. The individual, family
              members and any professionals identified on the referral form will
              be invited to the assessment unless otherwise stated. This may
              include the individual’s Speech and Language Therapist,
              Occupational Therapist, Teacher and/or Support Worker depending
              upon the individual’s needs.
            </p>
            <h2>The venue</h2>
            <p>
              Assessments are typically completed in an environment familiar to
              the individual. This may be the person’s home, school/college, day
              centre or workplace. However, your assessment appointment may be
              offered at Ace Centre offices, where this is possible and
              practicable.
            </p>
            <h2>Length of assessment</h2>
            <p>
              The length of time required for the initial assessment appointment
              will vary but typically takes place over the course of a day. On
              some occasions it may be necessary to make subsequent visits. The
              timings for the assessment will be agreed with the referrer
              initially and subject to modification if necessary.
            </p>
            <h2>What happens at the assessment?</h2>
            <p>
              Typically, two members of the assessment and training team will
              facilitate the assessment. The session will commence with a
              general discussion with everyone concerned providing an
              opportunity to share any relevant information and agree aims and
              expectations.
            </p>
            <p>
              During the assessment the individual will have an opportunity to
              demonstrate any resources they currently use and they will be
              supported in trying out alternative resources and strategies that
              might be suitable. It may be necessary to work for short periods,
              with breaks to set up different equipment and work within the
              individual’s levels of attention, motivation and stamina.
            </p>
            <p>
              At the end of the assessment, it is useful for the group meet
              again to discuss and consider potential recommendations in order
              to reach shared conclusions and appropriate solutions.
            </p>
            <h2>Following the assessment</h2>
            <p>
              The identified equipment will be purchased and a date will be
              agreed for the installation and initial training in its use with
              the individual and their team. Information will be given about
              what to do in the event of equipment failure and Ace Centre will
              contact you in the future to undertake a Planned Preventative
              Maintenance (PPM) Check to ensure the equipment is operating
              safely.
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
        <InformationDays nhs />
        {/* <FeaturedStory nhs {...featuredStory} /> */}
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const featuredStory = await getSimpleStory("paul");

  return {
    props: {
      featuredStory,
      seo: {
        title: "NHS Assessments",
        description:
          "Ace Centre is commissioned by NHS England to provide specialised AAC services across the North West and Wessex & Thames Valley NHSE specialised commissioning regions.",
      },
    },
  };
});
