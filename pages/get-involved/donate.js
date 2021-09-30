import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { FeaturedStory } from "../../components/featured-story/featured-story";
import { Footer } from "../../components/footer/footer";
import { OtherWaysToDonate } from "../../components/other-ways-to-donate/other-ways-to-donate";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { WhatMoneyCanDo } from "../../components/what-money-can-do/what-money-can-do";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getSimpleStory } from "../../lib/story/get-story";

import styles from "../../styles/donate.module.css";

export default function GetInvolved({ featuredStory }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <VideoWithCardCover
          src="/donate.jpg"
          alt="A client using an AAC device"
          imageClassName={styles.coverImage}
          heightClass={styles.coverHeight}
        >
          <h1 className={styles.cardTitle}>Donate</h1>
          <p className={styles.cardDescription}>
            As a relatively small charity we depend on regular giving to be able
            to continue to offer high quality services that are effective for
            those who use them.
          </p>
          <div className={styles.cardButton}>
            <Button href="https://www.justgiving.com/onecheckout/donation/direct/charity/139889">
              Make a donation
            </Button>
          </div>
          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 080 3115</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.columns}>
          <div className={styles.left}>
            <h2>Your support is vital</h2>
            <p>
              Ace Centre is a professionally run charity working with NHS and
              other partners. In order to maintain and expand our services we
              need to raise our own funds.
            </p>
            <p>
              Children and adults with physical or learning disabilities, or
              language disorders need prompt and free access to advice,
              information and support. To ensure we can continue to offer free
              information and helpline services to everyone who needs them we
              need at least £75k per year.
            </p>
          </div>
          <div className={styles.right}></div>
        </div>
        <WhatMoneyCanDo />
        <OtherWaysToDonate />
        <div className={styles.featuredImageContainer}>
          <FeaturedStory {...featuredStory} />
        </div>
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
        title: "Donate",
        description:
          "Ace Centre is a professionally run charity working with NHS and other partners. In order to maintain and expand our services we need to raise our own funds.",
      },
    },
  };
});
