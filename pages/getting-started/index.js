import { SearchBox } from "../../components/search-box/search-box";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

export default function GettingStartedLanding() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <SearchBox
          includeSearch={false}
          title="Getting started with AAC and AT"
          description="Learn about Augmentative and Alternative Communication (AAC) and how it can help"
          backgroundImage="/pink-wave.svg"
          backgroundColor="#F1D1D0"
          textColor="#333333"
        />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps();
