import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Avatar from "@mui/material/Avatar";

// import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

import styles from "../../styles/clinical-supervision.module.css";
import { getSimpleStory } from "../../lib/story/get-story";
import { FeaturedStory } from "../../components/featured-story/featured-story";
import { CONTACT_FORM, FormModal } from "../../components/ms-form";

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
          <h1 className={styles.cardTitle}>Clinical Supervision</h1>
          <p className={styles.cardDescription}>
            Transform your AAC practice with Ace Centre&apos;s exceptional
            clinical supervision; our expert therapists provide personalised
            support to boost your professional growth.
          </p>
          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButton}>
                <Button onClick={onClick}>
                  Enquire about Clinical Supervision
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
            <h2>Clinical Supervision</h2>
            <p>
              At Ace Centre our team of trained therapists offer exceptional
              clinical supervision services tailored to elevate your
              professional practice around alternative, augmentative
              communication (AAC). Whether you&apos;re a seasoned practitioner
              or just starting out, our services are designed to meet your
              unique needs.
            </p>
            <h2>Why Choose Clinical Supervision?</h2>
            <p>
              Clinical supervision is essential for professional growth and
              excellence. Here&apos;s why our service stands out:
            </p>
            <ul className={styles.list}>
              <ListItem>Reflective Space for Growth</ListItem>
              <p>
                &quot;Supervision creates a space for reflection on not only
                what you are doing, but also how and why you are doing it and
                the philosophical and theoretical foundations that underpin your
                practice.&quot; - RCSLT
              </p>
              <p>
                Our sessions provide a dedicated space to reflect on your
                practice, enhancing your current work and paving the way for
                continuous development.
              </p>
            </ul>
            <ul className={styles.list}>
              <ListItem>Enhance Your Skills and Knowledge</ListItem>
              <p>
                Gain insights and guidance from our experienced supervisors to
                navigate complex cases, improve techniques, and stay updated
                with the latest advancements.
              </p>
            </ul>
            <ul className={styles.list}>
              <ListItem>Personalised Support</ListItem>
              <p>
                Our supervision is tailored to your specific needs, offering
                support for case challenges, ethical dilemmas, and professional
                development plans.
              </p>
            </ul>
            <ul className={styles.list}>
              <ListItem>Foster Professional Accountability</ListItem>
              <p>
                Regular supervision encourages critical evaluation of your
                practice, adherence to ethical standards, and striving for
                excellence, benefiting both your clients and your professional
                reputation.
              </p>
            </ul>
            <ul className={styles.list}>
              <ListItem>Supportive and Collaborative Environment</ListItem>
              <p>
                Discuss your challenges and successes in a collaborative
                environment, building a strong, trust-based relationship with
                your supervisor.
              </p>
            </ul>
            <h2>Take the Next Step in Your Professional Journey </h2>
            <p>
              Invest in your professional future with clinical supervision from
              Ace Centre. We are committed to helping you achieve your full
              potential. Contact us today to learn more and schedule your first
              session.
            </p>
          </div>
          <div>
            {/* <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;This should be a quote about how great about mentoring
                  and supervision.&quot;
                </p>
                <div>
                  <p>
                    <strong>John Smith</strong>
                  </p>
                  <p>Speech and Language Therapist</p>
                  <p>Disneyland Community Hub</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
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
        title: "Clinical Supervision",
        description:
          "At Ace Centre our team of trained therapists offer exceptional clinical supervision services tailored to elevate your professional practice around alternative, augmentative communication (AAC).",
      },
    },
  };
};
