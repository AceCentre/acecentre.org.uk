import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { JobsAndPeople } from "../components/jobs-and-people/jobs-and-people";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../components/video-with-card-cover/video-with-card-cover";
import { WhyWorkAtAce } from "../components/why-work-at-ace/why-work-at-ace";
import { WorkingAtAce } from "../components/working-at-ace/working-at-ace";
import { useCartCount } from "../lib/cart/use-cart-count";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";

export default function Careers() {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <VideoWithCardCover
          src="/careers-cover.jpeg"
          alt="A person using an AAC device"
          objectPosition="50%"
        >
          <h1>Work with us</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit{" "}
            <strong>sed do eiusmod</strong> consectetur ipsum dolor
          </p>
        </VideoWithCardCover>
        <WorkingAtAce />
        <WhyWorkAtAce />
        <JobsAndPeople />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps();
