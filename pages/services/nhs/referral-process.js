import { Button } from "../../../components/button/button";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../../components/video-with-card-cover/video-with-card-cover";

import ListAltIcon from "@mui/icons-material/ListAlt";
import InfoIcon from "@mui/icons-material/Info";

// import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Avatar from "@mui/material/Avatar";
import { Image } from "../../../components/image";

import styles from "../../../styles/nhs-assessment.module.css";
import { getSimpleStory } from "../../../lib/story/get-story";
// import { FeaturedStory } from "../../../components/featured-story/featured-story";
// import { InformationDays } from "../../../components/information-days/information-days";
import Link from "next/link";
// import { AssessmentEligibility } from "../assessments";
// import { CONTACT_FORM, FormModal } from "../../../components/ms-form";
// import { CardHighlight } from "../../../components/project-highlight/project-highlight";
// import { AdviceLine } from "../../../components/advice-line/advice-line";
// import { ContactCards } from "../../../components/contact-cards/contact-cards";
import { GenericFaqs } from "../../../components/getting-started-faqs/getting-started-faqs";

const EVIDENCE_CONSIDERATION = [
  {
    question: "Evidence Consideration",
    answer: (
      <>
        <p>
          Recent screenshots, photos and videos that are submitted of the
          individual being referred should show them:
        </p>
        <ul>
          <li>
            Interacting and communicating with others (showing any resources
            they use)
          </li>
          <li>Accessing a computer or other technology</li>
          <li>
            Completing activities that demonstrate the physical movements they
            are capable of and in the typical range of positions they work in
          </li>
        </ul>
      </>
    ),
  },
];
const PRIORITISATION_CRITERIA = [
  {
    question: "NHS England Prioritisation Criteria:",
    answer: (
      <>
        <p>Priority will be given to clients:</p>
        <ul>
          <li>
            <strong>with a rapidly degenerative condition</strong>, e.g. Motor
            Neurone Disease, and efforts will be made to ensure these patients
            are assessed and/or provided with equipment as soon as is
            practically possible.
          </li>
          <li>
            <strong>
              with existing communication aid equipment that has ceased to be
              functional
            </strong>{" "}
            or is significantly unreliable, in order to meet their communication
            needs
          </li>
          <li>
            <strong>facing a transition</strong> to a new
            school/college/workplace environment or currently in rehabilitation
            provision.
          </li>
          <li>
            <strong>
              at risk of developing significant psychological/challenging
              behaviour{" "}
            </strong>
            because of their inability to communicate without a communication
            aid.
          </li>
        </ul>
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
          src="/services/referal-process1.jpg"
          alt="Employee with a child using a communication book"
          nhs
          heightClass={styles.coverHeight}
        >
          {/* <h1 className={styles.cardTitle}>NHS England Assessment</h1>
          <p className={styles.cardDescription}>
            Specialist AAC Service supporting the North West and Thames Valley &
            Wessex regions
          </p> */}
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>
              Understandings the referral process for the NHSE Specialised AAC
              Service
            </h2>
            <p>
              Ace Centre is one of the national services funded by NHS England
              (NHSE) to carry out Augmentative and Alternative Communication
              (AAC) Assessments across the North West and Thames Valley and
              Wessex regions. These services are for children and adults who
              need AAC and meet the NHSE eligibility criteria.
            </p>
            <p>
              The primary aim of referrals to a specialised AAC service must be
              related to a significant difficulty communicating through speech.
              Should your client need environmental controls and/or computer
              access, including email, messaging, or phone access, you are
              advised to refer your client to your regional Environmental
              Control Service.
            </p>
            <p>
              You can check the{" "}
              <Link href="/nhs-service-finder">NHS Service Finder</Link> to find
              the Specialised AAC Service and Environmental Control Service in
              your area.
            </p>
            <h3>What we do as an NHSE Specialised AAC Service:</h3>
            <ul>
              <li>
                Specialised AAC assessment, prescription and set up of AAC
                systems and initial training.
              </li>
              <li>
                Support the establishment, training and development of Local AAC
                Services (LAACES). For more information please see our{" "}
                <Link href="/services/nhs/laaces">LAACES page.</Link>
              </li>
            </ul>
            {/* <AssessmentEligibility nhs /> */}
            <h2>Who is eligible for an NHSE Specialised AAC Assessment?</h2>
            <p>
              Please refer to the decision chart and guidance document prior to
              making a referral to this service. This decision chart (below) and
              the{" "}
              <Link href="/docs/Eligibility-Guidance-July-2025-final.pdf">
                Eligibility Criteria guidance document
              </Link>{" "}
              are designed to support the decision-making process regarding
              eligibility.{" "}
            </p>
            <p>
              To be eligible for the NHSE Specialised AAC Services, a person
              must:{" "}
            </p>
            <ul>
              <li>be a resident in England </li>
              <li>be registered with a GP practice in England </li>
              <li>
                have a severe/complex communication difficulty associated with a
                range of physical, cognitive, learning, or sensory deficits
              </li>
              <li>
                have a clear discrepancy between their level of understanding
                and their ability to speak
              </li>
              <li>be able to understand the purpose of a communication aid</li>
              <li>have developed beyond cause and effect understanding</li>
              <li>
                have experience in using low-tech AAC that is insufficient to
                enable them to realise their communicative potential
              </li>
            </ul>
            <Link
              href="/refferal-decision-flow-chart.png"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                height={252}
                width={290}
                maxHeight={290}
                src={"/refferal-decision-flow-chart.png"}
                alt="Decision Chart"
              />
            </Link>
            <h2>Who can refer?</h2>
            <p>
              Referrals are can be made by health, education and social care
              professionals employed and/or funded by a statutory body or local
              team. We are unable to accept referrals from individuals, family
              members or independent therapists.
            </p>
            <p>
              The referrer should have prior and regular ongoing involvement
              with the person being referred and be prepared to support that
              person through the NHSE Specialised AAC Service assessment.
            </p>
            <strong>How do I refer?</strong>
            <p>Steps for submitting a referral:</p>
            <ol>
              <li>
                Download and read the{" "}
                <Link
                  href="/docs/Eligibility-Guidance-July-2025-final.pdf"
                  style={{ textDecoration: "underline" }}
                >
                  Eligibility Guidance Document
                </Link>
              </li>
              <li>
                Download the{" "}
                <Link
                  href="/docs/NHS-England-Specialised-AAC-Services-Referral-Form-v7-2025.docx"
                  style={{ textDecoration: "underline" }}
                >
                  referral form
                </Link>
                - please note all referrals should be made on this latest
                referral form.
              </li>
              <li>
                Fully complete all sections of the Referral Form electronically
                with detailed information and supporting evidence.{" "}
                <strong>Incomplete Referral Forms will not be accepted.</strong>
              </li>
              <li>
                Email the completed referral to{" "}
                <a
                  href="mailto:acecentre.admin@nhs.net"
                  style={{ color: "#1976d2", textDecoration: "underline" }}
                >
                  acecentre.admin@nhs.net
                </a>{" "}
                along with any other client information.
              </li>
              <li>
                Consider sending screenshots, photos and videos to support the
                evidence you are submitting. This will help our team plan for
                the assessment and determine what equipment may be required.
                <ul>
                  <li>
                    Upload your evidence to this{" "}
                    <Link href="https://acecent.re/video-upload">folder</Link>
                  </li>
                  <li>
                    Please email{" "}
                    <a href="mailto:acecentre.admin@nhs.net">
                      acecentre.admin@nhs.net
                    </a>{" "}
                    immediately after you have uploaded the evidence so we can
                    add it to the individual&apos;s referral.
                  </li>
                </ul>
              </li>
            </ol>

            <div className="assessment-faqs-override">
              <GenericFaqs faqs={EVIDENCE_CONSIDERATION} />
            </div>
            <h2>What happens when I refer?</h2>
            <p>
              <strong>
                All referrals will be acknowledged within ten days of receipt.
              </strong>{" "}
              Responses will state whether the referral has been accepted or not
              accepted due to the referral having insufficient evidence of the
              individual meeting eligibility criteria for the NHSE Specialised
              AAC Service.
            </p>
            <p>
              Please note that should your client’s referral be accepted for a
              specialised assessment, this does not guarantee that AAC equipment
              will be provided. At the point of assessment, in the event of your
              client being assessed as not meeting eligibility for the NHSE
              Specialised AAC Service, the Service Delivery Team will offer you
              guidance on how you can seek alternative funding routes.
            </p>
            <p>
              <strong>
                If you have received a letter stating your referral has been
                accepted
              </strong>{" "}
              you and your client will be offered a date for an assessment
              appointment by email and letter. A remote appointment may be
              offered to discuss your client’s communication needs which will
              assist the team in preparing for a follow up face to face
              appointment.
            </p>
            <p>
              Please note that the date offered will depend on{" "}
              <strong>NHSE Prioritisation criteria.</strong>
            </p>
            <p>
              <strong>
                If you have received a letter stating your referral has not been
                accepted
              </strong>{" "}
              this will include information about why the referral has not been
              accepted and provide guidance on how, as a local service, you can
              support your client in developing their use of AAC. The letter
              will also advise how you can speak with a member of the screening
              team should you wish to discuss this further.
            </p>
            <div className="assessment-faqs-override">
              <GenericFaqs faqs={PRIORITISATION_CRITERIA} />
            </div>
            <p>
              As the referrer, you will be the main contact. It will be your
              responsibility to disseminate information from Ace Centre to the
              client, parent/carer/significant other and relevant professionals,
              and to co-ordinate their attendance and/or contribution to the
              assessment process.{" "}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Avatar>
                <InfoIcon sx={{ fontSize: 50, color: "black" }} />
              </Avatar>
              <span>
                Call our advice line on Mon, Wed or Fri from 1-5PM to speak to a
                member of the Ace Centre clinical team to ask questions about
                the referral form or to discuss how to collect evidence and
                other considerations. Call 0800 080 3115 option 2.
              </span>
            </div>
            <h2>
              What do I do if my client does not meet the NHSE Specialised AAC
              Service eligibility criteria?{" "}
            </h2>
            <p>
              A person may not meet the eligibility for an NHSE Specialised AAC
              Service assessment. This does not mean they should not have access
              to AAC.
            </p>
            <p>
              Ace Centre have produced a bank of resources which support
              continued development and understanding of using AAC. Be sure to
              check out the <Link href="/resources">Resources area</Link> of our
              website for the full range but here are some ideas to get started:
            </p>
            <ul>
              <li>
                <Link href="/resources/all?category=made-by-ace&subcategory=e-books">
                  Getting Started eBooks
                </Link>
                {": "}covering a range of topics to help families and
                professionals develop robust paper based AAC symbol and
                text-based resources using a range of access methods.
              </li>
              <li>
                <Link href="/resources/all?category=symbol-charts&page=1">
                  Symbol Charts
                </Link>
                {": "}a wide range of topical symbol charts offered in five
                layouts to support different access methods designed to work on
                communication skills in fun and motivating activities.{" "}
              </li>
              <li>
                <Link href="/resources/all?category=alphabet-charts&page=1">
                  Alphabet Charts and Books
                </Link>
                {": "}a wide range of books and charts with varying layouts and
                using different access methods.{" "}
              </li>
            </ul>
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
                <ListAltIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>Decision Chart</strong>
                </p>
                <p>
                  Guidance on Referral Criteria for Specialised AAC Services
                </p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    href="/refferal-decision-flow-chart.png"
                  >
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
                  <strong>Guidance Document</strong>
                </p>
                <p>
                  Use this Eligibility Criteria guidance document to support
                  making a referral{" "}
                </p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    href="https://acecentreuk.sharepoint.com/:b:/s/files/EX8q5mI6DZ1FlBYRTcresW4BXzz1Geu8TH1_wPgjOZD3og?e=XEQu9h"
                  >
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
                  <strong>Referral Form</strong>
                </p>
                <p>Get the latest Specialised AAC Services Referral Form</p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    href="/docs/NHS-England-Specialised-AAC-Services-Referral-Form-v7-2025.docx"
                  >
                    Download form
                  </Button>
                </div>
              </div>
            </div>
            {/* <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <ListAltIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>NHSE Specialised AAC Service Specifications </strong>
                </p>
                <p>NHSE Specialised AAC Service Specifications and Guidance</p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    href="/docs/NHSE-Specialised-AAC-Service-Specifications.pdf"
                  >
                    Download form
                  </Button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* <InformationDays nhs /> */}
        {/* <AdviceLine /> */}
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
