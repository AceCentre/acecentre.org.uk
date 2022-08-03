import { AfterInteractive } from "../../components/after-interactive/after-interactive";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { GenericFaqs } from "../../components/getting-started-faqs/getting-started-faqs";
import { PageTitle } from "../../components/page-title/page-title";
import {
  ImportantCallout,
  ServiceCards,
} from "../../components/service-cards/service-cards";
import { serviceFinderFaqs } from "../../components/service-finder-faq";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllServices } from "../../lib/services-finder";

import styles from "../../styles/nhs-service-finder.module.css";

export default function ServiceDetails({ service }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} noPhoneNumber />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="NHS Service Directory"
          description={service.serviceName}
          className={styles.pageTitle}
        />
        <BackToLink
          className={styles.backToLink}
          href="/nhs-service-finder"
          where="service finder"
        />
        <ImportantCallout />
        <div className={styles.mapContainer}>
          <AfterInteractive>
            <iframe
              title={`Map centered on ${service.serviceName}`}
              width="100%"
              height="100%"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDCQjXT-r0vodp_u77adLzMaGzzQST_tvc&q=${service.postcode}&zoom=12`}
            ></iframe>
          </AfterInteractive>
        </div>
        <ServiceCards service={service} />
        <GenericFaqs faqs={serviceFinderFaqs} />
      </main>
      <Footer noPhoneNumber currentYear={currentYear} />
    </>
  );
}

export async function getStaticPaths() {
  const services = await getAllServices();

  return {
    paths: services.map((service) => ({ params: { slug: service.id } })),
    // Currently this is ignored by Netlify so we have to use `notFound`
    // Ref: https://github.com/netlify/netlify-plugin-nextjs/issues/1179
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const services = await getAllServices();
  const service = services.find((service) => service.id === slug);

  if (!service) return { notFound: true };

  // console.log(service);

  return {
    props: {
      service,
      seo: {
        title: service.serviceName,
        description: "Find an assistive technology service near you",
      },
    },
  };
});
