import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { PageTitle } from "../../../components/page-title/page-title";
import { ServicesGrid } from "../../../components/services-grid/services-grid";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";

export default function NHSLanding() {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle heading="Ace Centre" description="NHS Services" />
        <ServicesGrid gridItems={gridItems} />
      </main>
      <Footer />
    </>
  );
}

const gridItems = [
  {
    name: "Understanding the referral process",
    href: "/services/nhs/referral-process",
    image: {
      src: "/services/referral-process-cover-3.jpeg",
      alt: "A client communicating",
    },
  },
  {
    name: "What happens at an assessment",
    href: "/services/nhs/assessment-process",
    image: {
      src: "/services/assesments-hero-cover.png",
      alt: "Ace centre employee showing a client how to use a communication device",
    },
  },
  {
    name: "I have an Ace Centre device",
    href: "/services/nhs/I-have-a-device",
    image: {
      src: "/services/I-have-a-device-cover-3.jpeg",
      alt: "A client communicating",
    },
  },
  {
    name: "Local AAC Services (LAACES)",
    href: "/services/nhs/laaces",
    image: {
      src: "/services/laaces.jpg",
      alt: "Ace centre employee showing a client how to use a communication device",
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

export const getStaticProps = () => {
  return {
    props: {
      seo: {
        title: "NHS Services",
        description:
          "Ace Centre provides a range of services to support children and adults with severe communication difficulties.",
      },
    },
  };
};
