import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { FeaturedStory } from "../../components/featured-story/featured-story";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { WaysToGetInvolved } from "../../components/ways-to-get-involved/ways-to-get-involved";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getSimpleStory } from "../../lib/story/get-story";

export default function GetInvolved({ featuredStory }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <VideoWithCardCover
          src="/get-involved.jpg"
          alt="Client getting fitted with a new AAC device"
        >
          <h1>Get involved</h1>
          <p>
            We’re ensuring that people with the severest communication
            challenges continue to benefit from professional assessment and
            intervention
          </p>
        </VideoWithCardCover>
        <WaysToGetInvolved />
        <FeaturedStory {...featuredStory} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const featuredStory = await getSimpleStory("paul");

  return { props: { featuredStory } };
});
