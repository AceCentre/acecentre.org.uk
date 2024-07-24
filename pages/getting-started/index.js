import { SearchBox } from "../../components/search-box/search-box";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { GettingStartedGrid } from "../../components/getting-started-grid/getting-started-grid";
import { AacBooksCta } from "../../components/aac-books-cta/aac-books-cta";
import { GettingStartedFaqs } from "../../components/getting-started-faqs/getting-started-faqs";

export default function GettingStartedLanding() {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <SearchBox
          includeSearch={false}
          title="Getting started with AAC and AT"
          description="Learn about Augmentative and Alternative Communication (AAC) and how it can help"
          backgroundImage="/pink-wave.svg"
          backgroundColor="#F1D1D0"
          textColor="#333333"
        />
        <GettingStartedGrid />
        <AacBooksCta />
        <GettingStartedFaqs />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  return {
    revalidate: 60,
    props: {
      seo: {
        title: "Getting started",
        description:
          "Learn about Augmentative and Alternative Communication (AAC) and how it can help",
      },
    },
  };
};
