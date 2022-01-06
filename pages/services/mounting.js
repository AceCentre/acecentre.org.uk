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

import styles from "../../styles/mounting.module.css";
import { getSimpleStory } from "../../lib/story/get-story";
import { FeaturedStory } from "../../components/featured-story/featured-story";
import { getAllFullPosts } from "../../lib/posts/get-posts";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { CONTACT_FORM, FormModal } from "../../components/ms-form";

export default function MountingPage({ featuredStory, allPosts }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/services/mounting.jpeg"
          alt="Person with an AAC device mounted to their wheelchair"
          imageClassName={styles.coverImage}
          heightClass={styles.coverHeight}
        >
          <h1 className={styles.cardTitle}>Mount Installation</h1>
          <p className={styles.cardDescription}>
            Fitting mounts to allow you to take your device with you.
          </p>

          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButton}>
                <Button onClick={onClick}>Enquire about mounting</Button>
              </div>
            )}
          </FormModal>

          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 080 3115</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>
              Building and creating individual solutions – we don’t believe in
              ‘can’t’
            </h2>
            <p>
              Our highly skilled multi-disciplinary team design and develop
              innovative assistive technology solutions. We use the latest tools
              for design and manufacture to maximise the simplicity and
              effectiveness of the solution and minimise costs. We’re completely
              client-focussed and understand the challenging requirements of
              assistive technologies.
            </p>
            <p>
              In addition to supporting our work providing the NHS England
              Specialised AAC Service in the North West and Thames Valley and
              Wessex, we provide a wide range of services directly to
              individuals and families, charities, service providers, education
              and commercial organisations.
            </p>
            <h2>We specialise in:</h2>
            <ul className={styles.list}>
              <ListItem>Developing bespoke assistive technologies</ListItem>
              <ListItem>
                Providing consultancy at early stage product development
              </ListItem>
              <ListItem>
                Rapid design iteration from concept to production using the
                latest 3D Computer Aided Design (CAD) software
              </ListItem>
              <ListItem>
                Manufacture of components using our in-house state of the art
                Selective Laser Sintering (SLS) and Fused Deposition Modelling
                (FDM) 3D printers and CNC machine.
              </ListItem>
              <ListItem>
                Development of electronic devices for access to technology using
                low-cost development boards
              </ListItem>
            </ul>
            <p>
              Whilst these technologies sound complex, they help us to keep
              things simple! We consider all options during development,
              including solutions that are already available.
            </p>
            <div className={styles.inlineCard}>
              <h2>Individuals and families</h2>
              <ul className={styles.list}>
                <ListItem>Design and development of bespoke solutions</ListItem>
                <ListItem>
                  Advice on how to develop or manufacture a solution you’ve come
                  up with
                </ListItem>
                <ListItem>
                  Signposting to useful organisations or developing and
                  implementing access solutions to mainstream devices; using a
                  powerchair joystick to control a tablet for example.
                </ListItem>
                <ListItem>
                  Mounting and positioning assistive technologies and access
                  devices.
                </ListItem>
                <ListItem>Simply helping with ideas!</ListItem>
              </ul>
            </div>
            <div className={styles.inlineCard}>
              <h2>Charities and service providers</h2>
              <ul className={styles.list}>
                <ListItem>
                  Integration of assistive technologies to enhance access to
                  work, education or leisure activities
                </ListItem>
                <ListItem>Training and competency development</ListItem>
                <ListItem>
                  Carrying out or supporting assessments of complex access to
                  assistive technologies such as powered mobility, environmental
                  control and computer access
                </ListItem>
                <ListItem>
                  Mounting and positioning assistive technologies and access
                  devices.
                </ListItem>
                <ListItem>Consultancy for regulatory compliance</ListItem>
              </ul>
            </div>
            <div className={styles.inlineCard}>
              <h2>Commercial organisations</h2>
              <ul className={styles.list}>
                <ListItem>Early stage advice</ListItem>
                <ListItem>
                  Supporting your product development programme with a
                  multi-disciplinary team with wide-ranging skills and knowledge
                  of assistive technology
                </ListItem>
                <ListItem>Training and development</ListItem>
                <ListItem>Targeted user testing and focus groups</ListItem>
                <ListItem>
                  Consultancy for national and European regulatory compliance
                </ListItem>
              </ul>
            </div>
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;The challenges of mounting AAC devices and finding
                  access solutions for individuals with complex needs in a range
                  of settings drives my interest in engineering. We get the
                  opportunity to design and create bespoke components that
                  really make a difference to people&apos;s lives.&quot;
                </p>
                <div>
                  <p>
                    <strong>Diane Arthurs</strong>
                  </p>
                  <p>Senior AAC Engineer</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2>Pricing</h2>
            <p>
              We’ve provided below our standard pricing and guide pricing for
              additional services. Please do get in touch for more information
              and a detailed quotation.
            </p>
            <div className={styles.pricingButton}>
              <Button newTab href="/engineering-pricing.pdf">
                Download pricing
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.extraSpacing}>
          <FeaturedStory {...featuredStory} />
        </div>
        {allPosts.length > 0 && (
          <div className={styles.extraSpacing}>
            <FeaturedPosts
              title="Engineering on the blog"
              posts={allPosts}
              smallCards
            />
          </div>
        )}
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
  const featuredStory = await getSimpleStory("patrick");
  const unfilteredPosts = await getAllFullPosts();

  const allPosts = unfilteredPosts
    .filter((x) => x.mainCategoryName === "engineering")
    .slice(0, 4);

  return {
    props: {
      featuredStory,
      allPosts,
      seo: {
        title: "Mount Installation",
        description:
          "Our highly skilled multi-disciplinary team design and develop innovative assistive technology solutions. We use the latest tools for design and manufacture to maximise the simplicity and effectiveness of the solution and minimise costs.",
      },
    },
  };
});
