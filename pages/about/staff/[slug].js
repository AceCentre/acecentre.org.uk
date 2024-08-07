import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { getAllStaff } from "../../../lib/staff/get-staff";
import { StaffPage as Staff } from "../../../components/staff-page/staff-page";
import { useRouter } from "next/router";

export default function StaffPage({ allStaff, currentActive }) {
  const { isFallback } = useRouter();

  if (isFallback) return null;

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <Staff allStaff={allStaff} currentActive={currentActive} />
      </main>
      <Footer />
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

export const getStaticProps = async ({ params: { slug } }) => {
  const allStaff = await getAllStaff();

  if (allStaff.find((x) => x.slug === slug) === undefined) {
    console.log("huh");
    return { notFound: true };
  }

  return {
    revalidate: 60,
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
};
