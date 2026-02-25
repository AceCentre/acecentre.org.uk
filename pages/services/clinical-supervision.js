import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Avatar from "@mui/material/Avatar";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

import styles from "../../styles/clinical-supervision.module.css";
import { getSimpleStory } from "../../lib/story/get-story";
import { FeaturedStory } from "../../components/featured-story/featured-story";
import { InformationDays } from "../../components/information-days/information-days";

export default function EngineeringPage({ featuredStory }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/services/clinical2-compressed.jpeg"
          alt="Two clinicians looking at an AAC device"
          heightClass={styles.coverHeight}
          imageClassName={styles.coverImage}
        >
          <h1 className={styles.cardTitle}>Supervision and Mentoring</h1>
          <p className={styles.cardDescription}>
            Transform your AAC practice with Ace Centre&apos;s Clinical
            Supervision or Mentoring services, where our expert team provides
            guidance to boost your skills and professional growth.
          </p>
          <div className={styles.cardButton}>
            <Button href="mailto:supervisionandmentoring@acecentre.org.uk">
              Enquire about this service
            </Button>
          </div>

          <p className={styles.cardContact}>
            or call us on <strong>0800 080 3115</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>Supervision and Mentoring Services</h2>

            <ul className={styles.list}>
              <ListItem>Clinical Supervision</ListItem>
            </ul>
            <p>
              The Health and Care Professions Council (HCPC) identifies
              supervision as a core process of professional learning and
              development that enables you to reflect on and develop your
              knowledge, skills, and competence. Transform your AAC practice
              with personalised support from our expert therapists designed to
              boost your professional growth.
            </p>
            <ul className={styles.bulletList}>
              <li>
                <strong>A Process of Professional Learning:</strong> According
                to HCPC standards, supervision is a collaborative process that
                enables you to reflect on and review your work to enhance your
                practice.
              </li>
              <li>
                <strong>Distinct from Line Management:</strong> Importantly,
                clinical supervision at Ace Centre is not an assessment of
                competence or a formal appraisal. Keeping this separate from
                managerial supervision allows you to openly reflect and improve
                your professional skills with clear boundaries.
              </li>
              <li>
                <strong>Supervisee-Led Development:</strong> To ensure your
                unique needs are met, our sessions are led by the supervisee,
                allowing you to identify your own individual training and
                development goals.
              </li>
              <li>
                <strong>Reflective Space for Growth:</strong> We provide a
                dedicated space to reflect not just on what you are doing, but
                the how and why, including the theoretical foundations of your
                practice.
              </li>
              <li>
                <strong>Foster Professional Accountability:</strong> Regular
                sessions encourage the critical evaluation of your practice and
                adherence to ethical standards.
              </li>
            </ul>

            <ul className={styles.list}>
              <ListItem>Mentoring</ListItem>
            </ul>
            <p>
              Boost your AAC support skills with personalised guidance from our
              experienced team to enhance your knowledge and confidence.
            </p>
            <ul className={styles.bulletList}>
              <li>
                <strong>Expert Guidance from AAC Consultants:</strong> Our
                mentoring program is led by highly qualified professionals,
                including Specialist Teachers, Speech and Language Therapists
                and Occupational Therapists, who provide insights tailored to
                your unique challenges.
              </li>
              <li>
                <strong>Build Confidence and Competence:</strong> Mentoring is
                designed to enhance your skills in delivering effective AAC
                support, ensuring you feel fully capable in supporting AAC
                users.
              </li>
              <li>
                <strong>What You Will Gain:</strong> You will receive tailored
                advice and strategies to address specific AAC-related challenges
                while learning best practices and innovative techniques from
                seasoned professionals.
              </li>
              <li>
                <strong>Affordable Excellence:</strong> These services are
                priced competitively, making them an accessible investment in
                your professional or personal development.
              </li>
            </ul>
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;I am where I am today with their support, and we have
                  built a strong working relationship by sharing knowledge and
                  comparing ideas. I continue to grow in confidence and feel
                  fully capable in my working context.&quot;
                </p>
                <div>
                  <p>
                    <strong>Kay Barnes</strong>
                  </p>
                  <p>Assistive Technologist</p>
                  <p>Leonard Cheshire</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InformationDays
          imageSrc="/Info-Appointment-Picture.jpg"
          imageAlt="Person discussing development needs with Ace Centre team"
          title="Information appointments"
          description="Meet with our team to discuss your development needs and to learn more about the options and if one is right for you."
          buttonText="Book a free appointment"
          buttonHref="https://outlook.office.com/book/PartnershipsConsultancyManager@acecentre.org.uk/s/Erw2WCJruEyCeOLx6dOfcQ2?ismsaljsauthenabled=true"
        />
        <div className={styles.extraSpacing}>
          <FeaturedStory {...featuredStory} />
        </div>
      </main>
      <Footer />
    </>
  );
}

const ListItem = ({ children }) => {
  return (
    <li className={styles.listItem}>
      <Avatar className={styles.listAvatar}>
        <ChevronRightIcon />
      </Avatar>
      {children}
    </li>
  );
};

export const getStaticProps = async () => {
  const featuredStory = await getSimpleStory("olive");

  return {
    props: {
      featuredStory,
      seo: {
        title: "Supervision and Mentoring",
        description:
          "At Ace Centre our team of trained therapists offer exceptional clinical supervision services tailored to elevate your professional practice around alternative, augmentative communication (AAC).",
      },
    },
  };
};
