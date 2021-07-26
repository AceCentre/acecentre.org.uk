import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";

import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";
import { PageTitle } from "../components/page-title/page-title";
import { HowCanWeHelpDropdown } from "../components/how-can-we-help-dropdown/how-can-we-help-dropdown";

export default function TechnicalSupport() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle
          heading="Technical support"
          description="Get technical support from the Ace Centre"
        />
        <HowCanWeHelpDropdown />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps();
