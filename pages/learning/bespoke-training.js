import Avatar from "@material-ui/core/Avatar";
import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import {
  COURSE_EVALUATION,
  FormModal,
  LEARNING_ENQ,
} from "../../components/ms-form";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import styles from "../../styles/bespoke.module.css";

export default function BespokeTraining() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/bespoke.jpeg"
          alt="An engineering using a 3D printer"
          imageClassName={styles.coverImage}
          heightClass={styles.coverHeight}
        >
          <h1 className={styles.cardTitle}>Bespoke Training</h1>
          <p className={styles.cardDescription}>
            Bespoke courses focusing on the use of AT and AAC
          </p>

          <FormModal form={LEARNING_ENQ}>
            {({ onClick }) => (
              <div className={styles.cardButton}>
                <Button onClick={onClick}>
                  Enquire about bespoke training
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
            <p>
              Ace Centre Learning offers bespoke training to meet your specific
              needs and learning requirements. From small groups to whole
              organisations, schools, or services, we can tailor an online or
              face-to-face training programme specifically for you.
            </p>
            <p>
              Our expert and experienced Ace Centre team will create a course
              tailored to your needs, with agreed Learning Outcomes, to enhance
              knowledge and skills on the use of Specialist Assistive Technology
              and Augmentative and Alternative Communication (AAC). Our training
              sessions, delivered by practitioners with first hand experience,
              are an engaging mix of theory and practical, with an emphasis on
              developing skills and confidence through reflective and
              collaborative practice.
            </p>
            <h2>Pricing:</h2>
            <h3>Face-to-Face:</h3>
            <ul className={styles.list}>
              <ListItem>Training Half Day £720*</ListItem>
              <ListItem>Full Day £1200*</ListItem>
            </ul>
            <p>
              *prices as delivered at an Ace Centre location. For training at
              your venue add travel @45ppm return journey from the nearest Ace
              Centre. Other costs may apply.
            </p>
            <h3>Online Live Training</h3>
            <ul className={styles.list}>
              <ListItem>Half Day £600</ListItem>
              <ListItem>Full Day £1000</ListItem>
            </ul>
            <p>Delivered on MS Teams</p>
            <div className={styles.inlineCard}>
              <h2>Learn more about:</h2>
              <ul className={styles.list}>
                <ListItem>AAC</ListItem>
                <ListItem>Mounting</ListItem>
                <ListItem>
                  Access methods, such as switch, eye, mouse or voice control
                </ListItem>
              </ul>
            </div>
            <div className={styles.inlineCard}>
              <h2>Develop your skills on:</h2>
              <ul className={styles.list}>
                <ListItem>Implementing Assistive Technology solutions</ListItem>
                <ListItem>Switch skill progression</ListItem>
                <ListItem>Becoming an expert communication partner</ListItem>
                <ListItem>Using AAC in the classroom</ListItem>
              </ul>
            </div>
            <p>
              Complete the training enquiry form for more information and to
              discuss how we can develop a suitable training programme for you.
            </p>
            <FormModal form={LEARNING_ENQ}>
              {({ onClick }) => (
                <div className={styles.cardButton}>
                  <Button onClick={onClick}>
                    Enquire about bespoke training
                  </Button>
                </div>
              )}
            </FormModal>
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;A fantastic course that gave me so much more than I was
                  expecting. Exciting and overwhelming, but great.&quot;
                </p>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;Fantastic content and delivery of the training. I feel
                  like I&apos;ve gained so much from this afternoon. Thank you
                  so much!.&quot;
                </p>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <RecordVoiceOverIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <h3>Feedback</h3>
                <p>
                  Let us know what you thought of the training course you
                  attended. We will use your feedback to improve our future
                  courses.
                </p>
                <FormModal form={COURSE_EVALUATION}>
                  {({ onClick }) => (
                    <div>
                      <Button onClick={onClick}>Leave your feedback</Button>
                    </div>
                  )}
                </FormModal>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer currentYear={currentYear} />
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

export const getStaticProps = withGlobalProps(async () => {
  return {
    props: {
      seo: {
        title: "Bespoke Training",
        description:
          "We provide bespoke courses focusing on the use of Specialist Assistive Technology and Augmentative and Alternative Communication (AAC)",
      },
    },
  };
});
