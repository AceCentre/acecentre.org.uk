import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { GenericFaqs } from "../../components/getting-started-faqs/getting-started-faqs";
import { PageTitle } from "../../components/page-title/page-title";
import { serviceFinderFaqs } from "../../components/service-finder-faq";
import { ServiceFinderMap } from "../../components/service-finder-map/service-finder-map";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { getAllServices } from "../../lib/services-finder";

export default function ServiceFinder({ services }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="NHS Service Finder"
          description="Find an assistive technology service near you"
        />
        <ServiceFinderMap services={services} />
        <GenericFaqs faqs={serviceFinderFaqs} />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const services = await getAllServices();
  const reducedServices = services.map((x) => ({
    id: x.id,
    serviceName: x.serviceName,
  }));

  return {
    revalidate: 60,
    props: {
      services: reducedServices,
      seo: {
        title: "NHS Service Finder",
        description: "Find an assistive technology service near you",
      },
    },
  };
};
