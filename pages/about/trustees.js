import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { TrusteeList } from "../../components/staff-list/staff-list";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllTrustees } from "../../lib/trustees/get-trustees";

export default function AllTrusteesPage({ allTrustees }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle
          heading="Our trustees"
          description="Meet the AceCentre trustees."
        />

        <TrusteeList trusteeList={allTrustees} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allTrustees = await getAllTrustees();

  return { props: { allTrustees } };
});
