import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { GenericFaqs } from "../../components/getting-started-faqs/getting-started-faqs";
import { PageTitle } from "../../components/page-title/page-title";
import { serviceFinderFaqs } from "../../components/service-finder-faq";
import { ServiceFinderSearch } from "../../components/service-finder-search/service-finder-search";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import Link from "next/link";
import styles from "../../styles/nhs-service-finder.module.css";

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
          description="Find an assistive technology service near you"
          className={styles.pageTitle}
        />
        <div className={styles.linkContainer}>
          <Link href="/nhs-service-finder/maps">
            Click here to view Assistive Technology service coverage on a map
          </Link>
        </div>
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
        description: "Find an assistive technology service near you",
      },
    },
  };
});
