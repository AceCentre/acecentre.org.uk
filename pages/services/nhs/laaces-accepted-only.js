import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { GenericFaqs } from "../../../components/getting-started-faqs/getting-started-faqs";
import { SearchBox } from "../../../components/search-box/search-box";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav-items";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";

export default function Laaces() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav
          nhsTitle="NHS England Local AAC Services"
          defaultNavItems={defaultNavItems}
          nhs
        />
      </header>
      <main id="mainContent">
        <SearchBox
          includeSearch={false}
          title="Local AAC Services"
          description="Explore the services offered to Local AAC Services in North West and Thames Valley & Wessex regions"
          backgroundImage="/nhs-wave.svg"
          backgroundColor="#ffffff"
          textColor="#ffffff"
          dashColor="white"
        />
        <GenericFaqs nhs faqs={laacesFaqs} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const laacesFaqs = [
  {
    question: "Should I keep the box?",
    answer: (
      <>
        <p>Yes</p>
      </>
    ),
  },
  {
    question: "What do I do when i need tech support?",
    answer: (
      <>
        <p>Call someone</p>
      </>
    ),
  },
  {
    question: "What kind of services can you tell me about?",
    answer: (
      <>
        <p>
          Currently we have data on AAC Services, EC services and Wheelchair
          services. We also only have data for UK services.
        </p>
        <p>If you think we should include more services then </p>
      </>
    ),
  },
  {
    question: "We can have as many of these as we want",
    answer: (
      <>
        <p>Call someone</p>
      </>
    ),
  },
];

export const getStaticProps = withGlobalProps(async () => {
  return {
    props: {
      seo: {
        noIndex: true,
        title: "LAACES",
        description:
          "Ace Centre is committed to help support the establishment and development of local AAC services in both the Thames Valley & Wessex and Northwest regions within which we provide the NHSE Specialised AAC Services.",
      },
    },
  };
});
