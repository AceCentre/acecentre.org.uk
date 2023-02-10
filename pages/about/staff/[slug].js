import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";
import { getAllStaff } from "../../../lib/staff/get-staff";
import { StaffPage as Staff } from "../../../components/staff-page/staff-page";
import { useRouter } from "next/router";

export default function StaffPage({ allStaff, currentActive }) {
  const { currentYear } = useGlobalProps();
  const { isFallback } = useRouter();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        {!isFallback && (
          <Staff allStaff={allStaff} currentActive={currentActive} />
        )}
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}
export const getStaticPaths = async () => {
  const allStaff = await getAllStaff();
  const paths = allStaff.map((person) => ({
    params: { slug: person.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const allStaff = await getAllStaff();

  if (allStaff.find((x) => x.slug === slug) === undefined) {
    console.log("huh");
    return { notFound: true };
  }

  return {
    props: {
      allStaff,
      currentActive: slug,
      seo: {
        title: "Our Team",
        description:
          "Ace Centre is a multi-disciplinary team of specialist teachers, occupational therapists, speech & language therapists with the support of technical and administrative staff.",
      },
    },
  };
});
