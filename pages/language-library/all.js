import { useEffect, useState } from "react";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { LanguageLibrarySearchForm } from "../../components/language-library-search-form/language-library-search-form";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import {
  getFields,
  getLanguageLibrarySearchResultsProps,
} from "../../lib/language-library";
import { useRouter } from "next/router";
import { FullPageSpinner } from "../../components/full-page-spinner/full-page-spinner";

const useRouterReady = () => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsReady(router.isReady);
  }, [router.isReady]);

  return isReady;
};

export default function LanguageLibrary({ resources, fields }) {
  const isReady = useRouterReady();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle heading="Explore" description="AAC Language Library" />
        {isReady ? (
          <LanguageLibrarySearchForm resources={resources} fields={fields} />
        ) : (
          <FullPageSpinner />
        )}
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const resources = await getLanguageLibrarySearchResultsProps();
  const fields = await getFields();

  return {
    revalidate: 60,
    props: {
      fields,
      resources,
      seo: { dontIndex: true, title: "AAC Language Library" },
    },
  };
};
