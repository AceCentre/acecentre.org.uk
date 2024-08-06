import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Avatar from "@mui/material/Avatar";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

import styles from "../../styles/mentoring.module.css";
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
          src="/services/mentoring4-compressed.jpeg"
          alt="Two clinicians looking at an AAC device"
          heightClass={styles.coverHeight}
          imageClassName={styles.coverImage}
        >
          <h1 className={styles.cardTitle}>Mentoring</h1>
          <p className={styles.cardDescription}>
            Boost your AAC support skills with Ace Centre&apos;s mentoring,
            offering personalised guidance from our experienced team to enhance
            your knowledge.
          </p>
          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButton}>
                <Button onClick={onClick}>Enquire about Mentoring</Button>
              </div>
            )}
          </FormModal>

          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 080 3115</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>Mentoring</h2>
            <p>
              Welcome to Ace Centre, where we offer specialised mentoring
              services for anyone supporting clients who use Augmentative and
              Alternative Communication (AAC). Our mentoring program is designed
              to enhance your skills, knowledge, and confidence in delivering
              effective AAC support.
            </p>
            <h2>Why Choose Our Mentoring Service?</h2>
            <p>
              Clinical supervision is essential for professional growth and
              excellence. Here&apos;s why our service stands out:
            </p>
            <ul className={styles.list}>
              <ListItem>
                <strong>Expert Guidance from an AAC Consultant</strong>
              </ListItem>
              <p>
                Our mentoring service is led by an experienced AAC Consultant
                from our team. You’ll benefit from personalised guidance and
                insights tailored to your unique challenges and goals.
              </p>
            </ul>
            <ul className={styles.list}>
              <ListItem>
                <strong>Our Specialist Team</strong>
              </ListItem>
              <p>
                Our team comprises highly qualified professionals, including:
                Specialist Teachers, Occupational Therapists and Specialist
                Teachers
              </p>
            </ul>
            <ul className={styles.list}>
              <ListItem>
                <strong>Affordable Excellence</strong>
              </ListItem>
              <p>
                Our mentoring services are priced competitively, making it an
                accessible investment in your professional or personal
                development.
              </p>
            </ul>

            <h2>What you will gain</h2>
            <ul className={styles.list}>
              <ListItem>
                <strong>Personalised Support</strong>: Tailored advice and
                strategies to address your specific AAC-related challenges.
              </ListItem>
              <ListItem>
                <strong>Enhanced Skills</strong>: Learn best practices and
                innovative techniques from seasoned professionals.
              </ListItem>
              <ListItem>
                <strong>Collaborative Approach</strong>: Engage in a supportive,
                collaborative environment that fosters skill development.
              </ListItem>
              <ListItem>
                <strong>Confidence and Competence</strong>: Build your
                confidence in supporting AAC users, ensuring better outcomes for
                your clients.
              </ListItem>
            </ul>
          </div>
          <div>
            <div className={styles.quote}>
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
            </div>
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
      <div>{children}</div>
    </li>
  );
};

export const getStaticProps = async () => {
  const featuredStory = await getSimpleStory("patrick");

  return {
    props: {
      featuredStory,
      seo: {
        title: "Mentoring",
        description:
          "At Ace Centre our team of trained therapists offer exceptional Mentoring services tailored to elevate your professional practice around alternative, augmentative communication (AAC).",
      },
    },
  };
};
