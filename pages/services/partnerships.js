import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Avatar } from "@material-ui/core";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

import styles from "../../styles/partnerships.module.css";
import { getSimpleStory } from "../../lib/story/get-story";
import { FeaturedStory } from "../../components/featured-story/featured-story";
import { CONTACT_FORM, FormModal } from "../../components/ms-form";

export default function EngineeringPage({ featuredStory }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <VideoWithCardCover
          src="/services/partnership.jpg"
          alt="Two Ace Centre staff members looking at an AAC device"
          heightClass={styles.coverHeight}
        >
          <h1 className={styles.cardTitle}>Partnerships</h1>
          <p className={styles.cardDescription}>
            For 35 years Ace Centre has supported people with alternative and
            augmentative communication (AAC) and assistive technology (AT)
            needs.
          </p>
          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButton}>
                <Button onClick={onClick}>Enquire about partnerships</Button>
              </div>
            )}
          </FormModal>

          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 080 3115</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>Partnerships with Ace Centre</h2>
            <p>
              We achieve positive outcomes for our clients by drawing on the
              skills of our multidisciplinary team of teachers, speech and
              language therapists, occupational therapists, engineers and
              technicians.
            </p>
            <p>
              Through our individually tailored Partnerships, we work on
              developing practitioner skills by offering a side-by-side
              approach, meaning individuals develop skills and confidence in a
              guided manner through reflective practice.
            </p>
            <h2>What we offer you:</h2>
            <ul className={styles.list}>
              <ListItem>
                A legacy of effective practice, through skill development.
              </ListItem>
              <ListItem>Mentoring for key practitioners.</ListItem>
              <ListItem>
                Remote support from one of our allocated consultants
              </ListItem>
              <ListItem>
                Free access to a tailored loan bank of AT /AAC equipment with
                guidance on implementation.
              </ListItem>
              <ListItem>
                Bespoke training packages delivered to your team, focusing on a
                train-the-trainer approach.
              </ListItem>
              <ListItem>
                Structured access to our new online training platform
              </ListItem>
            </ul>
            <h2>Pricing</h2>
            <p>
              Partnerships are offered in three distinct packages with the
              ability to create a truly bespoke partnership by adding additional
              options from our range of services.
            </p>
            <div className={styles.pricingButton}>
              <Button newTab href="/partnership-pricing.pdf">
                Download pricing
              </Button>
            </div>
            <h2>Who are partnerships for?</h2>
            <div className={styles.inlineCard}>
              <h2>Education</h2>
              <p>
                Work closely with our consultants to form a development plan
                targeting your school or college’s AAC and AT needs, resulting
                in clear and measurable outcomes.
              </p>
            </div>
            <div className={styles.inlineCard}>
              <h2>Health</h2>
              <p>
                Partner with our team to evaluate your service’s current local
                AAC and AT offering, working together to create a plan of
                bespoke and targeted supports to meet your development needs.
              </p>
            </div>
            <div className={styles.inlineCard}>
              <h2>Companies</h2>
              <p>
                Our multi-disciplinary team will lead you through creating a
                continuous improvement plan to up-skill staff and establishing a
                lasting system of work to support people in your care.
              </p>
            </div>
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;We have been partnering with Ace Centre for several
                  years. They are always responsive to our changing needs and
                  add value to the services we can offer to the people we
                  support.&quot;
                </p>
                <div>
                  <p>
                    <strong>Kitty Stewart</strong>
                  </p>
                  <p>Senior Speech and Language Therapist</p>
                  <p>Guernsey Adult and Community Services Partnership</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.extraSpacing}>
          <FeaturedStory {...featuredStory} />
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
  const featuredStory = await getSimpleStory("paul");

  return {
    props: {
      featuredStory,
      seo: {
        title: "Partnerships",
        description:
          "We achieve positive outcomes for our clients by drawing on the skills of our multidisciplinary team of teachers, speech and language therapists, occupational therapists, engineers and technicians.",
      },
    },
  };
});
