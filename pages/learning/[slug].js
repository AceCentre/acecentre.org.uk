import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getAllCourses } from "../../lib/products/get-courses";

export default function LearningDetail({ course }) {
  const { currentYear } = useGlobalProps();

  console.log(course);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main></main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export async function getStaticPaths() {
  const allCourses = await getAllCourses();

  if (!allCourses) throw new Error("Could not get all the courses");

  return {
    paths: allCourses.map((product) => ({
      params: {
        slug: product.slug,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const allCourses = await getAllCourses();

  if (!allCourses) throw new Error("Could not get all the courses");

  const currentCourse = allCourses.find((product) => product.slug === slug);

  return {
    props: {
      course: currentCourse,
    },
  };
});
