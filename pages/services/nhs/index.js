import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { PageTitle } from "../../../components/page-title/page-title";
import { ServicesGrid } from "../../../components/services-grid/services-grid";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";

export default function NHSLanding() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle heading="Ace Centre" description="NHS Services" />
        <ServicesGrid gridItems={gridItems} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const gridItems = [
  {
    name: "NHS England Assessment",
    href: "/services/nhs/assessments",
    image: {
      src: "/services/nhs-assessment.jpg",
      alt: "A client communicating",
    },
  },
  {
    name: "Local AAC Services (LAACES)",
    href: "/services/nhs/laaces",
    image: {
      src: "/services/laaces.jpg",
      alt:
        "Ace centre employee showing a client how to use a communication device",
    },
  },
  {
    name: "NHS Service Finder",
    href: "/nhs-service-finder",
    image: {
      src: "/nhs-service-finder.jpeg",
      alt: "Ace centre employee and client laughing",
    },
  },
];

export const getStaticProps = withGlobalProps(() => {
  return {
    props: {
      seo: {
        title: "NHS Services",
        description:
          "Ace Centre provides a range of services to support children and adults with severe communication difficulties.",
      },
    },
  };
});
