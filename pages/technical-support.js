import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";

import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { PageTitle } from "../components/page-title/page-title";
import { HowCanWeHelpDropdown } from "../components/how-can-we-help-dropdown/how-can-we-help-dropdown";
import { StillHavingProblems } from "../components/still-having-problems/still-having-problems";

export default function TechnicalSupport() {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="Technical support"
          description="What to do when you need help"
        />
        <HowCanWeHelpDropdown />
        <StillHavingProblems />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      seo: {
        title: "Technical support",
        description: "What to do when you need help",
      },
    },
  };
};
