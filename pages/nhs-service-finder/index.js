import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { GenericFaqs } from "../../components/getting-started-faqs/getting-started-faqs";
import { PageTitle } from "../../components/page-title/page-title";
import { serviceFinderFaqs } from "../../components/service-finder-faq";
import { ServiceFinderSearch } from "../../components/service-finder-search/service-finder-search";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

export default function ServiceFinder() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="NHS Service Finder"
          description="Find a specialised service near you"
        />
        <ServiceFinderSearch />
        <GenericFaqs faqs={serviceFinderFaqs} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(() => {
  return {
    props: {
      seo: {
        title: "NHS Service Finder",
        description: "Find a specialised service near you",
      },
    },
  };
});
