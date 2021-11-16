import { Avatar } from "@material-ui/core";
import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { FormModal, LEARNING_ENQ } from "../../components/ms-form";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

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
              We are developing more courses for Ace Centre Learning but if you
              can’t find what you are looking for we can offer a bespoke course
              to meet your needs. Our Service Delivery staff are experienced at
              providing either online or face-to-face training sessions. We will
              design a course to address your learning requirements and can
              provide different packages to meet your training needs. Whether
              you are wanting a course for a small group of people, a whole
              organisation, school or service we can tailor a programme
              specifically for you.
            </p>
            <p>
              We provide bespoke courses focusing on the use of Specialist
              Assistive Technology and Augmentative and Alternative
              Communication (AAC). Our expert Ace Centre team can help to create
              a bespoke training solution to enhance your knowledge and skills.
            </p>
            <h2>Pricing:</h2>
            <h3>Face-to-Face:</h3>
            <ul className={styles.list}>
              <ListItem>
                Training Half Day £720 (if delivered at Ace Centre)
              </ListItem>
              <ListItem>
                Full Day £1200 + travel @45ppm return journey between nearest
                Ace Centre and training venue
              </ListItem>
            </ul>
            <h3>Online Live Training</h3>
            <p>This will be delivered using MS Teams</p>
            <ul className={styles.list}>
              <ListItem>Half Day £600</ListItem>
              <ListItem>Full Day £1000</ListItem>
            </ul>
            <div className={styles.inlineCard}>
              <h2>Learn more about:</h2>
              <ul className={styles.list}>
                <ListItem>AAC</ListItem>
                <ListItem>Mounting</ListItem>
                <ListItem>
                  Methods of access, such as switch, eye, mouse or voice control
                </ListItem>
              </ul>
            </div>
            <div className={styles.inlineCard}>
              <h2>Develop your skills in the following areas:</h2>
              <ul className={styles.list}>
                <ListItem>Implementing Assistive Technology solutions</ListItem>
                <ListItem>Switch skill progression</ListItem>
                <ListItem>Becoming an expert communication partner</ListItem>
                <ListItem>Using AAC in the classroom</ListItem>
              </ul>
            </div>
            <p>
              We will agree the Learning Outcomes for your bespoke course and
              design it to meet your needs.
            </p>
            <p>
              Complete the training enquiry form to see how we can develop a
              suitable training programme for you.
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
