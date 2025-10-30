import { Button } from "../../../components/button/button";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../../components/video-with-card-cover/video-with-card-cover";

// import ListAltIcon from "@mui/icons-material/ListAlt";
import InfoIcon from "@mui/icons-material/Info";

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
import { CardHighlight } from "../../../components/project-highlight/project-highlight";
// import { Card } from "../../../components/contact-cards/contact-cards";
// import contactCardStyles from "../../../components/contact-cards/contact-cards.module.css" ;
import { GenericFaqs } from "../../../components/getting-started-faqs/getting-started-faqs";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { CONTACT_FORM, FormModal } from "../../../components/ms-form";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const SUPPORT = [
  {
    question: "What do I do if I need ongoing support for my AAC device?",
    answer: (
      <>
        <p>
          Your local team will support you with using the AAC device provided by
          Ace Centre.
        </p>

        <p>Please contact your local team if you need support with:</p>
        <ul>
          <li>
            editing and personalising the content in your communication
            software.
          </li>
          <li>using your device for functional communication.</li>
          <li>any additional training</li>
        </ul>

        <p>Your local team may include:</p>
        <ul>
          <li>Speech and Language Therapist</li>
          <li>Occupational Therapist</li>
          <li>Teacher</li>
          <li>Family and Carers</li>
        </ul>

        <p>
          Ace Centre will contact you in the future to ensure your equipment is
          working safely.
        </p>
      </>
    ),
  },
];
const UPDATE_DEVICE = [
  {
    question: "What do I do if a change or update to my AAC device is needed?",
    answer: (
      <>
        <p>
          A new referral to the NHSE Specialised AAC Service at Ace Centre can
          be made if:
        </p>
        <ul>
          <li>
            You are unable to access your AAC device as your physical
            abilities/needs have changed.
          </li>
          <li>
            Your AAC device is no longer meeting your communication needs.
          </li>
          <li>Your AAC device is old and no longer working properly.</li>
          <li>
            The use of your AAC device has significantly changed following a
            change in your home and support situation.
          </li>
        </ul>

        <p>
          This should be discussed with your local team first. A re-referral
          should be made by a health, social care or education professional.
          More information can be found here on the{" "}
          <Link href="/services/nhs/referral-process">
            Understanding the referral process for the NHSE Specialised AAC
            Service
          </Link>{" "}
          page.
        </p>

        <p>
          You may feel that you need a change or update to your AAC device but
          do not currently have a local team supporting you. You and your care
          team can contact Ace Centre to discuss this by:
        </p>
        <ul>
          <li>Phone call: 0800 080 3115 option 3</li>
          <li>
            email{" "}
            <a href="mailto:acecentre.admin@nhs.net">acecentre.admin@nhs.net</a>
          </li>
        </ul>

        <p>
          <strong>
            If you no longer require your equipment, please let Ace Centre
            Technical Support know on 0800 080 3115 ext 1.
          </strong>
        </p>
      </>
    ),
  },
];

const BROKEN_DEVICE = [
  {
    question: "My AAC device is broken or not working properly",
    answer: (
      <>
        <p>Ace Centre Technical Support can be contacted for the following:</p>
        <ul>
          <li>Your AAC device is not working properly</li>
          <li>Your AAC device has been lost, stolen or damaged</li>
          <li>You want help to backup/restore user files</li>
          <li>
            You need help to change the AAC device settings or use features of
            the device (e.g. volume, access settings)
          </li>
          <li>
            You need help to update the operating system or communication
            software
          </li>
          <li>
            You have difficulties with your AAC device accessories (e.g. eye
            gaze, switch, joystick, mounting)
          </li>
        </ul>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            margin: "1rem 0",
          }}
        >
          <Avatar>
            <InfoIcon sx={{ fontSize: 50, color: "black" }} />
          </Avatar>
          <div>
            <br />
            <strong>Contact Ace Centre Technical Support:</strong>
            <br /> 0800 080 3115 ext 1
            <br />
            <a href="mailto:Techteam@acecentre.org.uk">
              techteam@acecentre.org.uk
            </a>
          </div>
        </div>

        <p>
          When you contact our Technical Support team, you will need the AAC
          device with you and its name and serial number. You may need to be
          connected to the internet so our team can access your device.
        </p>
      </>
    ),
  },
];

const CHANGE_ADDRESS = [
  {
    question: "My address or contact details have changed",
    answer: (
      <>
        <p>If you move, please let us know your new residential address.</p>
        <p>
          If you change school or college, please let us know your new
          school/college details.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            margin: "1rem 0",
          }}
        >
          <Avatar>
            <InfoIcon sx={{ fontSize: 50, color: "black" }} />
          </Avatar>
          <div>
            <br />
            <strong>Contact Ace Centre Admin team:</strong>
            <br /> 0800 080 3115 ext 3
            <br />
            <a href="mailto:acecentre.admin@nhs.net">acecentre.admin@nhs.net</a>
          </div>
        </div>
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
          src="/services/I-have-a-device-cover.png"
          alt="AAC devices on a shelf"
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
            <h1>I have an Ace Centre electronic AAC device</h1>
            <p>
              I have had an assessment from the NHSE Specialised AAC Service at
              Ace Centre and received an NHS funded AAC device.
            </p>

            <div className="assessment-faqs-override">
              <GenericFaqs faqs={SUPPORT} />
            </div>

            <div className="assessment-faqs-override">
              <GenericFaqs faqs={UPDATE_DEVICE} />
            </div>

            <div className="assessment-faqs-override">
              <GenericFaqs faqs={BROKEN_DEVICE} />
            </div>

            <div className="assessment-faqs-override">
              <GenericFaqs faqs={CHANGE_ADDRESS} />
            </div>

            <CardHighlight
              title="I need wheelchair or environmental control support"
              description="You can check the NHS Service Finder to find the service that can help you with a wheelchair or controlling the environment like making phone calls, opening doors or using a computer."
              viewText="Visit service finder"
              href="/nhs-service-finder"
            />
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
                <EmailIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <strong>Get in touch</strong>
                Send an email and we&apos;ll be in touch as soon as possible.
                <FormModal form={CONTACT_FORM}>
                  {({ onClick }) => (
                    <div className={styles.downloadFormButtonContainer}>
                      <Button
                        className={styles.downloadFormButton}
                        onClick={onClick}
                      >
                        Contact form
                      </Button>
                    </div>
                  )}
                </FormModal>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <PhoneIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <strong>Give us a call</strong>
                Call our technical team for support:
                <span>
                  <strong>0800 080 3115</strong> <i>option 1</i>
                </span>
                9AM - 5PM, Monday – Friday
              </div>
            </div>

            <div className={styles.quote}>
              <div className={styles.quote}>
                <Avatar className={styles.avatar}>
                  <SupportAgentIcon className={styles.icon} />
                </Avatar>
                <div className={styles.quoteText}>
                  <p>
                    <strong>Remote support</strong>
                  </p>
                  <p>
                    Download this app when remote support from the Ace Centre is
                    needed
                  </p>
                  <div className={styles.downloadFormButtonContainer}>
                    <Button
                      className={styles.downloadFormButton}
                      href="https://get.teamviewer.com/ace_centre"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", maxWidth: "400px", margin: "1rem auto" }}>
          {/* <Card>
            <h3>Technical Support</h3>
            <p>What to do when you&apos;re having device problems</p>
            <Link href="/technical-support" className={styles.link}>
              Get technical support &gt;
            </Link>
          </Card> */}
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
