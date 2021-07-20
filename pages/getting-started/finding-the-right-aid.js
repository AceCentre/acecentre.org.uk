import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import styles from "../../styles/getting-started.module.css";

export default function GettingStartedLanding() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <VideoWithCardCover
          src="/finding-the-right-aid-cover.jpg"
          alt="An individual using a head tracking AAC device"
        >
          <h1>Which is the right communication aid for me?</h1>
          <p className={styles.description}>
            The problem is that there is no ‘one size fits all’ communication
            aid solution.
          </p>
        </VideoWithCardCover>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps();
