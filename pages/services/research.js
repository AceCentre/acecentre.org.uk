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

import styles from "../../styles/research.module.css";
import { getSimpleStory } from "../../lib/story/get-story";
// import { FeaturedStory } from "../../components/featured-story/featured-story";
import { getAllProjects } from "../../lib/posts/get-posts";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { CONTACT_FORM, FormModal } from "../../components/ms-form";

export default function EngineeringPage({ latestProjects }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <VideoWithCardCover
          src="/services/research.jpg"
          alt="A communication device"
          imageClassName={styles.coverImage}
          heightClass={styles.coverHeight}
        >
          <h1 className={styles.cardTitle}>Research</h1>
          <p className={styles.cardDescription}>
            Our research and development projects enhance achievement and good
            practice in the field
          </p>

          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButton}>
                <Button onClick={onClick}>Enquire about research</Button>
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
              Ace Centre works with companies, universities and other charities
            </h2>
            <ul className={styles.list}>
              <ListItem>
                Investigate health and education issues for children and adults
                with complex disabilities
              </ListItem>
              <ListItem>
                Support companies to trial new products and develop progressive
                technology
              </ListItem>
              <ListItem>Find solutions for an individual or a sector</ListItem>
            </ul>
            <p>
              Research and development projects enhance achievement and good
              practice in the field; directly, through the development of AT &
              AAC, and indirectly through awareness raising, skills building and
              informing government policy. Service-users with communication
              disabilities are involved throughout.
            </p>
            <p>
              We focus on projects with a marked or lasting impact; previously
              we have developed new products (e.g. AccessMaths software) or new
              services.
            </p>
            <p>
              We are enthusiastic about supporting organisations that share our
              vision. If you wish to carry out a research or development project
              in our field we would love to hear from you.
            </p>
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;As having direct involvement with a large number of
                  individuals with complex disabilities Ace Centre is uniquely
                  positioned to identify research and development gaps and
                  understand the need and how technology can and should support
                  people in the real world&quot;
                </p>
                <div>
                  <p>
                    <strong>Will Wade</strong>
                  </p>
                  <p>Senior AAC Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FeaturedPosts
          className={styles.container}
          title="Latest projects"
          viewAllLink="/projects/all"
          posts={latestProjects}
          linkPrefix="projects"
        />

        {/* <div className={styles.extraSpacing}>
          <FeaturedStory {...featuredStory} />
        </div> */}
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
  const latestProjects = await getAllProjects();

  return {
    props: {
      featuredStory,
      latestProjects: latestProjects.slice(0, 6),
      seo: {
        title: "Research",
        description:
          "Research and development projects enhance achievement and good practice in the field; directly, through the development of AT & AAC, and indirectly through awareness raising, skills building and informing government policy. Service-users with communication disabilities are involved throughout.",
      },
    },
  };
});
