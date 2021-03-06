import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { RecruitTrustees } from "../../components/recruit-trustees/recruit-trustees";
import { TrusteeList } from "../../components/staff-list/staff-list";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllTrustees } from "../../lib/trustees/get-trustees";

import styles from "../../styles/trustees.module.css";

export default function AllTrusteesPage({ allTrustees, recruitingTrustees }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle heading="Our trustees" description="Meet our amazing team" />
        {recruitingTrustees && <RecruitTrustees />}
        <p className={styles.container}>
          The Ace Centre is hugely thankful for our Trustees who help steer and
          oversee the organisation direction.
        </p>
        <TrusteeList trusteeList={allTrustees} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allTrustees = await getAllTrustees();

  const [day, month, year] = "16/9/2022".split("/");

  const closingDate = new Date(`${month}/${day}/${year}`);
  const nowDate = new Date();

  const recruitingTrustees = nowDate.getTime() < closingDate.getTime();

  return {
    props: {
      allTrustees,
      recruitingTrustees,
      seo: {
        title: "Our Trustees",
        description:
          "The Ace Centre is hugely thankful for our Trustees who help steer and oversee the organisation direction.",
      },
    },
  };
});
