import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { RecruitTrustees } from "../../components/recruit-trustees/recruit-trustees";
import { TrusteeList } from "../../components/staff-list/staff-list";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { getAllTrustees } from "../../lib/trustees/get-trustees";

import styles from "../../styles/trustees.module.css";

export default function AllTrusteesPage({ allTrustees, recruitingTrustees }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle heading="Our trustees" description="Meet our amazing team" />
        {recruitingTrustees && <RecruitTrustees />}
        <p className={styles.container}>
          Ace Centre is hugely thankful to its trustees, who help steer and oversee the organisation’s direction.
        </p>
        <TrusteeList trusteeList={allTrustees} />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const allTrustees = await getAllTrustees();

  const [day, month, year] = "16/9/2022".split("/");

  const closingDate = new Date(`${month}/${day}/${year}`);
  const nowDate = new Date();

  const recruitingTrustees = nowDate.getTime() < closingDate.getTime();

  return {
    revalidate: 60,
    props: {
      allTrustees,
      recruitingTrustees,
      seo: {
        title: "Our Trustees",
        description:
          "Ace Centre is hugely thankful to its trustees, who help steer and oversee the organisation’s direction.",
      },
    },
  };
};
