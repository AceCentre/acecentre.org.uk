import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
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
      <main>
        <PageTitle
          heading="NHS Service Finder"
          description="Find a specialised service near you"
        />
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
