import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalPropsNoRevalidate } from "../../../lib/global-props/inject";
import { getAllStaff } from "../../../lib/staff/get-staff";
import { StaffPage as Staff } from "../../../components/staff-page/staff-page";

export default function StaffPage({ allStaff }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <Staff allStaff={allStaff} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalPropsNoRevalidate(async () => {
  const allStaff = await getAllStaff();

  return {
    props: {
      allStaff,
      seo: {
        title: "Our Team",
        description:
          "Ace Centre is a multi-disciplinary team of specialist teachers, occupational therapists, speech & language therapists with the support of technical and administrative staff.",
      },
    },
  };
});
