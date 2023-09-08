import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { LanguageLibrarySearchForm } from "../../components/language-library-search-form/language-library-search-form";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalPropsNoRevalidate } from "../../lib/global-props/inject";

export default function LanguageLibrary() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle heading="Explore" description="Language Library" />
        <LanguageLibrarySearchForm />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalPropsNoRevalidate(async () => {
  // const props = await getLanguageLibraryLandingPageData();

  return {
    props: {
      seo: { dontIndex: true, title: "Language Library" },
    },
  };
});
