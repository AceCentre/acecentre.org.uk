import { Button } from "../../../components/button/button";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../../components/video-with-card-cover/video-with-card-cover";

import ListAltIcon from "@mui/icons-material/ListAlt";
import InfoIcon from "@mui/icons-material/Info";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Avatar from "@mui/material/Avatar";
import { Image } from "../../../components/image";

import styles from "../../../styles/nhs-assessment.module.css";
import { getSimpleStory } from "../../../lib/story/get-story";
// import { FeaturedStory } from "../../../components/featured-story/featured-story";
// import { InformationDays } from "../../../components/information-days/information-days";
import Link from "next/link";
// import { AssessmentEligibility } from "../assessments";
import { CONTACT_FORM, FormModal } from "../../../components/ms-form";
import { CardHighlight } from "../../../components/project-highlight/project-highlight";
import { Card } from "../../../components/contact-cards/contact-cards";
// import contactCardStyles from "../../../components/contact-cards/contact-cards.module.css";
export default function NHSLanding() {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} nhs />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/services/device-hero.png"
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
            <h1>I have an Ace Centre electronic AAC device</h1>
            <p>
              I have had an assessment from the NHSE Specialised AAC Service at
              Ace Centre and received an NHS funded AAC device.
            </p>

            <h2>What do I do if I need ongoing support for my AAC device?</h2>
            <p>
              Your local team will support you with using the AAC device
              provided by Ace Centre. There is information on the{" "}
              <Link href="/technical-support">
                Ace Centre Technical Support page
              </Link>{" "}
              that can help.
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
              <li>Parents and Carers</li>
            </ul>

            <p>
              Ace Centre will contact you in the future to ensure your equipment
              is working safely.
            </p>

            <h2>
              What do I do if a change or update to my AAC device is needed?
            </h2>
            <p>
              A re-referral to the NHSE Specialised AAC Service at Ace Centre
              can be made if:
            </p>
            <ul>
              <li>
                You are unable to access your AAC device as your physical
                abilities/needs have changed.
              </li>
              <li>
                Your AAC device is no longer meeting your communication needs.
              </li>
              <li>Your AAC device is nearing the end of life.</li>
              <li>
                If you are a long term AAC user and the use of your AAC device
                has significantly changed following a change in your home and
                support situation.
              </li>
            </ul>

            <p>
              This should be discussed with your local team first. A re-referral
              should be made by a health, social care or education professional.
              More information can be found here on the{" "}
              <Link href="/services/nhs/assessments">
                Understanding the referral process for the NHSE Specialised AAC
                Service
              </Link>{" "}
              page.
            </p>

            <p>
              If you do not currently have a local team supporting you with your
              communication but feel you need a change or update to your AAC
              device, you and your care team can contact Ace Centre team to
              discuss this by:
            </p>
            <ul>
              <li>Phone call: 0800 080 3115 option 3</li>
              <li>
                email{" "}
                <a href="mailto:acecentre.admin@nhs.net">
                  acecentre.admin@nhs.net
                </a>
              </li>
            </ul>

            <p>
              <strong>
                If you no longer require your equipment, please let Ace Centre
                Technical Support know on 0800 080 3115 ext 1.
              </strong>
            </p>
            <br />

            <h2>My AAC device is broken or not working properly</h2>
            <p>
              Ace Centre Technical Support can be contacted for the following:
            </p>
            <ul>
              <li>Your AAC device is not working properly</li>
              <li>Your AAC device has been lost, stolen or damaged</li>
              <li>You want help to backup/restore user files</li>
              <li>
                You need help to change the AAC device settings or use features
                of the device (e.g. volume, access settings)
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
                  Techteam@acecentre.org.uk
                </a>
              </div>
            </div>

            <p>
              When you contact our Technical Support team, you will need the AAC
              device with you and its name and serial number. You may need to be
              connected to the internet so our team can access your device.
            </p>

            <h2>My address or contact details have changed</h2>
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
                <a href="mailto:acecentre.admin@nhs.net">
                  acecentre.admin@nhs.net
                </a>
              </div>
            </div>

            <CardHighlight
              title="I need wheelchair or environmental control support"
              description="You can check the NHS Service Finder to find the service that can help you with a wheelchair or controlling the environment like making phone calls, opening doors or using a computer."
              viewText="Visit service finder"
              href="/nhs-service-finder"
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
                <br />
                <strong>Tech Support</strong>
                <br /> Contact Ace Centre Technical Support
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    href="/technical-support"
                  >
                    Get technical support
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <ListAltIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>Easy Read Doc</strong>
                </p>
                <p>coming soon</p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button className={styles.downloadFormButton} href="#">
                    Download form
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <ListAltIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>LOTE Docs</strong>
                </p>
                <p>coming soon</p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button className={styles.downloadFormButton} href="#">
                    Download form
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", maxWidth: "400px", margin: "1rem auto" }}>
          <Card>
            <h3>Technical Support</h3>
            <p>What to do when you&apos;re having device problems</p>
            <Link href="/technical-support" className={styles.link}>
              Get technical support &gt;
            </Link>
          </Card>
        </div>

        {/* <InformationDays nhs /> */}
        {/* <FeaturedStory nhs {...featuredStory} /> */}
      </main>
      <Footer />
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
