import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import {
  getAllBundles,
  getAllCourses,
  getRandomReviews,
} from "../../lib/products/get-courses";
import { BackToLink } from "../../components/back-to-link/back-to-link";

import styles from "../../styles/learning-detail.module.css";
import {
  BundleDetailBox,
  LearningDetailBox,
} from "../../components/learning-detail-box/learning-detail-box";
import { LearningDetailMeta } from "../../components/learning-detail-meta/learning-detail-meta";

import { LearningReviews } from "../../components/learning-reviews/learning-reviews";
import { CourseList } from "../../components/course-list/course-list";
import { Certificate } from "../../components/certificate/certificate";
import { getLearningLevels } from "../../lib/products/get-learning-levels";
import { MailingList } from "../../components/service-finder-mailing-list/service-finder-mailing-list";
import Link from "next/link";
import { BundleList } from "../../components/bundle-list/bundle-list";
import { addBundles } from "../../lib/add-bundles";
import { ListOfBundles } from "../../components/list-of-bundles/list-of-bundles";

export default function LearningDetail({
  course,
  bundle,
  reviews,
  relatedCourses,
  levels,
}) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink href="/learning/search" where="courses" />
        {course && (
          <>
            <div className={styles.container}>
              <h2 className={styles.courseTitle}>{course.name}</h2>
            </div>
            <LearningDetailBox course={course} />
            <div className={styles.contentBody}>
              <div>
                <ListOfBundles course={course} />
                <div dangerouslySetInnerHTML={{ __html: course.content }} />
                <p className={styles.timezone}>
                  *All times shown are given{" "}
                  <Link href="https://www.timeanddate.com/worldclock/uk/london">
                    in the UK timezone
                  </Link>
                  , on the date the course is run.
                </p>
                <div className={styles.mailingListContainer}>
                  <MailingList
                    signUpIdentifier="learning-detail"
                    description="Sign up to our free newsletter to get emails about our latest Ace Centre Learning courses and other news."
                  />
                </div>
                <LearningReviews reviews={reviews} />
              </div>
              <div>
                <Certificate />
                <LearningDetailMeta course={course} levels={levels} />
              </div>
            </div>
            <CourseList
              title="Other courses you might like"
              products={relatedCourses}
              showDate
            />
          </>
        )}
        {bundle && (
          <>
            <div className={styles.container}>
              <h2 className={styles.courseTitle}>
                Course Bundle: {bundle.title}
              </h2>
            </div>
            <BundleDetailBox bundle={bundle} />

            <div className={styles.contentBody}>
              <div>
                <div dangerouslySetInnerHTML={{ __html: bundle.description }} />

                <BundleList bundle={bundle}></BundleList>
                <LearningReviews reviews={reviews} />
              </div>
              <div>
                <Certificate />
                <MailingList
                  signUpIdentifier="learning-detail"
                  description="Sign up to our free newsletter to get emails about our latest Ace Centre Learning courses and other news."
                />
              </div>
            </div>
          </>
        )}
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export async function getStaticPaths() {
  const allCourses = await getAllCourses();
  const allBundles = await getAllBundles();

  if (!allCourses || !allBundles)
    throw new Error("Could not get all the courses");

  return {
    paths: [...allCourses, ...allBundles].map((product) => ({
      params: {
        slug: product.slug,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const allCourses = await getAllCourses();
  const allBundles = await getAllBundles();

  if (!allCourses || !allBundles)
    throw new Error("Could not get all the courses");

  let currentCourse = allCourses.find((product) => product.slug === slug);
  const currentBundle = allBundles.find((product) => product.slug === slug);

  let relatedCourses = [];

  if (currentCourse) {
    currentCourse = addBundles(currentCourse, allBundles);

    relatedCourses = allCourses
      .filter((course) => course.slug !== slug)
      .sort((a, b) => {
        const catA = a.mainCategoryName;
        const catB = b.mainCategoryName;

        if (catA == currentCourse.mainCategoryName) {
          return -1;
        }

        if (catB == currentCourse.mainCategoryName) {
          return 1;
        }

        return 1;
      })
      .slice(0, 4);
  }

  const reviews = await getRandomReviews();
  const levels = await getLearningLevels();

  let seo = {};

  if (currentCourse) {
    seo = {
      title: currentCourse.title,
      image: currentCourse.image,
      description: currentCourse.shortDescription.replace(/(<([^>]+)>)/gi, ""),
      product: {
        sku: currentCourse.slug,
        title: currentCourse.title,
        image: currentCourse?.image?.src || null,
        url: `https://acecentre.org.uk/learning/${currentCourse.slug}`,
        price: currentCourse.price || 0,
        availability: currentCourse.inStock,
        description:
          currentCourse.description ||
          `Checkout the ${currentCourse.title} created by Ace Centre Learning.`,
      },
    };
  } else if (currentBundle) {
    seo = {
      title: currentBundle.title,
      description: currentBundle.shortDescription.replace(/(<([^>]+)>)/gi, ""),
    };
  }

  return {
    props: {
      course: currentCourse || null,
      bundle: currentBundle || null,
      reviews,
      relatedCourses,
      levels,
      seo,
    },
  };
});
