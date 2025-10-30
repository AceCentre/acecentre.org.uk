// import { Button } from "../../../components/button/button";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../../components/video-with-card-cover/video-with-card-cover";

// import ListAltIcon from "@mui/icons-material/ListAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Avatar from "@mui/material/Avatar";
// import { Image } from "../../../components/image";

import styles from "../../../styles/nhs-assessment.module.css";
import { getSimpleStory } from "../../../lib/story/get-story";
// import { FeaturedStory } from "../../../components/featured-story/featured-story";
// import { InformationDays } from "../../../components/information-days/information-days";
import Link from "next/link";
// import { AssessmentEligibility } from "../assessments";
// import { CONTACT_FORM, FormModal } from "../../../components/ms-form";
// import { CardHighlight } from "../../../components/project-highlight/project-highlight";
import { GenericFaqs } from "../../../components/getting-started-faqs/getting-started-faqs";

const LANGUAGE_FAQS = [
  {
    question: "What happens if I speak a language other than English?",
    answer: (
      <>
        <p>We believe that all languages are of equal importance.</p>
        <p>
          Most languages don&apos;t have a wide range of pre-made AAC resources.
        </p>
        <p>We will make sure you are given AAC in any languages you need.</p>
        <p>
          Unfortunately, we are limited by what the technology can do. This
          might mean that there is not a system, voice or keyboard available in
          all the languages you use.
        </p>
        <p>
          We will discuss with you what options are available in the language
          you use or whether we can create something new. Making new
          vocabularies can take a long time to create, but we will discuss this
          with you during your assessment.
        </p>
        <p>
          We will work with you and with a translator to provide some initial
          resources in all the languages you use.
        </p>
        <p>
          If you have electronic AAC, the system, settings etc. might still be
          in English.
        </p>
      </>
    ),
  },
];

export default function NHSLanding() {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} nhs />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/services/assesments-hero-cover.png"
          alt="A child laughing"
          nhs
          heightClass={styles.coverHeight}
        >
          {/* <h1 className={styles.cardTitle}>NHS England Assessment</h1>
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
          </p> */}
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>What happens at an NHSE Specialised AAC Service Assessment</h2>
            <h3>Who are we?</h3>
            <p>
              Ace Centre provides an NHS England (NHSE) service for AAC
              Assessments. AAC means &apos;Augmentative and Alternative
              Communication&apos; which is anything other than speech that can
              be used for communication. This could be electronic equipment
              (like a tablet), or paper-based (like a book or chart). You can
              use AAC as well as using your speech.
            </p>
            <p>
              The assessment process helps the team at Ace Centre find the best
              AAC for the people who have been referred to us.{" "}
            </p>
            <h2>Why have I been referred?</h2>
            <p>
              Your Speech Therapist or another professional has referred you
              because they feel you would benefit from new or different AAC.{" "}
            </p>
            <h2>Who should be involved?</h2>
            <p>
              Ace Centre will support you and your team. This means anyone who
              helps you with your communication can be involved, such as your
              carer or teacher.
            </p>
            <p>
              The Ace Centre team will include AAC Consultants who could be
              Speech Therapists, Occupational Therapists or Teachers. Often an
              Assistant Practitioner will be there too.
            </p>
            <p>
              An interpreter will join the assessment if you speak a language
              other than English, even if you also speak some English.
            </p>
            <h2>Where will the assessment be? </h2>
            <p>
              The assessment can take place anywhere you feel comfortable. For
              example, this could be at your home, school, day centre or Ace
              Centre.
            </p>
            <h2>How long is the assessment?</h2>
            <p>
              Assessments usually take two hours, but sometimes they can be
              longer or shorter. This depends on things like whether more than
              one language is involved.
            </p>
            <p>
              If you&apos;re getting tired or need to stop, we will listen to
              you. If you know that a certain time of the day is usually easier
              or harder for you, please tell us.
            </p>
            <p>If we need more time, we can come back another day.</p>
            <h2>What happens at the assessment?</h2>
            <p>The assessment is very informal and is not a test.</p>
            <p>
              The Ace Centre team, made of 2-3 members of staff, will join you
              and your local team. If you, or anyone on your team, speaks a
              language other than English an interpreter will also join us for
              the whole assessment.
            </p>
            <p>
              We will talk about what is working well with your communication,
              and what is more difficult.
            </p>
            <p>We might ask you to show us how you communicate now.</p>
            <p>
              We will also look at your physical skills and talk to you about
              what is important to you.
            </p>
            <p>We will ask you when, where and who you communicate with.</p>
            <p>
              We will ask you about what languages you speak, and who you speak
              each language with.
            </p>
            <p>You can ask us any questions you have.</p>
            <p>You will get a chance to try out some AAC to see what works.</p>
            <p>We might come back again if we need more time or information.</p>
            <div className="assessment-faqs-override">
              <GenericFaqs faqs={LANGUAGE_FAQS} />
            </div>
            <h2>What happens after the assessment? </h2>
            <p>
              Once we have found something that works for you, we can order it
              or make it.
            </p>
            <p>We will come back to give you the AAC when it is ready.</p>
            <p>
              We will provide training on how to use it, for you and the people
              who help you. An interpreter will join this appointment if you, or
              anyone on your team, speaks a language other than English.{" "}
            </p>
            <p>You can ask us any questions about the AAC. </p>

            {/* <CardHighlight
              title="Find an assistive technology service near you"
              description="Find your nearest NHS AAC Service, Environmental Control Service or Wheelchair Service."
              viewText="Visit service finder"
              href="/nhs-service-finder"
            /> */}
          </div>
          <div>
            {/* <div className={styles.serviceProvidedByContainer}>
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
            </div> */}

            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <LocationOnIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>Visiting Ace Centre</strong>
                </p>
                <p>
                  <Link href="https://acecentre.org.uk/contact/oldham">
                    Oldham
                  </Link>
                </p>
                <p>
                  <Link href="https://acecentre.org.uk/contact/abingdon">
                    Abingdon
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <InformationDays nhs /> */}
        {/* <FeaturedStory nhs {...featuredStory} /> */}
      </main>
      <Footer />
      <style jsx global>{`
        .assessment-faqs-override [class*="faqTitle"] {
          display: none !important;
        }
        .assessment-faqs-override [class*="faqTagline"] {
          display: none !important;
        }
        .assessment-faqs-override [class*="greyBackground"],
        .assessment-faqs-override [class*="whiteBackground"] {
          background: none !important;
        }
        .assessment-faqs-override [class*="container"] {
          padding-top: 0 !important;
          padding-bottom: 2rem !important;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
        .assessment-faqs-override [class*="innerContainer"] {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
        /* Hide the blue card when it has no content but keep hero full width */
        .cardColor:empty {
          display: none !important;
        }
        /* Ensure hero maintains full width even when card is empty */
        .cardColor:empty ~ * {
          display: none !important;
        }
      `}</style>
    </>
  );
}

export const getStaticProps = async () => {
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
};
