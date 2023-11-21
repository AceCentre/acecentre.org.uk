import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { ServicesGrid } from "../../components/services-grid/services-grid";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";

export default function ServicesLanding() {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle heading="Ace Centre" description="Services" />
        <ServicesGrid />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      seo: {
        title: "Services",
        description:
          "Ace Centre provides a range of services to support children and adults with severe communication difficulties.",
      },
    },
  };
};
