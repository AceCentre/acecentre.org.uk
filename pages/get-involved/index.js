import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Facts } from "../../components/facts/facts";
// import { FeaturedStory } from "../../components/featured-story/featured-story";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { WaysToGetInvolved } from "../../components/ways-to-get-involved/ways-to-get-involved";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getSimpleStory } from "../../lib/story/get-story";

import styles from "../../styles/get-involved.module.css";

export default function GetInvolved() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/get-involved.jpg"
          alt="Client getting fitted with a new AAC device"
          heightClass={styles.coverHeight}
          imageClassName={styles.coverImage}
        >
          <h1>Get involved</h1>
          <p>
            Your support is vital ensure our ongoing work to give children and
            adults access to the advice, information and support they need to
            fulfil their potential.
          </p>
        </VideoWithCardCover>
        <div className={styles.columns}>
          <div className={styles.left}>
            <h2>Why support Ace Centre?</h2>
            <p>
              Staffed by a team of teachers, therapists and technicians, Ace
              Centre offers many years experience and expertise in Assistive
              Technology (AT), particularly Augmentative and Alternative
              Communication (AAC). The charity also provides a range of general
              services to support children and adults with severe communication
              difficulties.
            </p>
            <p>
              We are grateful to sponsors, commissioners and funding bodies that
              enable us to continue and develop our provision. As a relatively
              small charity we depend on regular giving to be able to continue
              to offer high quality services that are effective for those who
              use them.
            </p>
            <p>
              By supporting Ace Centre you help ensure that people with the
              severest communication challenges continue to benefit from
              professional assessment and intervention. Whilst we often make use
              of low-tech gadgets and techniques we also need to be able to
              provide expensive solutions for those who need them.
            </p>
            <p>This is why we hope you will support Ace Centre.</p>
          </div>
          <div className={styles.right}>
            <Facts />
          </div>
        </div>
        <WaysToGetInvolved />
        {/* <FeaturedStory {...featuredStory} /> */}
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const featuredStory = await getSimpleStory("paul");

  return {
    props: {
      featuredStory,
      seo: {
        title: "Get involved",
        description:
          "By supporting Ace Centre you help ensure that people with the severest communication challenges continue to benefit from professional assessment and intervention. Whilst we often make use of low-tech gadgets and techniques we also need to be able to provide expensive solutions for those who need them.",
      },
    },
  };
});
