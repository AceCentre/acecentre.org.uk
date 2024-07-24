import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { LearningSearch } from "../../components/learning-search/learning-search";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { LearningTicks } from "../../components/resources-ticks/resources-ticks";
import { CourseCategoriesGrid } from "../../components/course-categories-grid/course-categories-grid";

import styles from "../../styles/resources.module.css";
import { Button } from "../../components/button/button";
import { TrainingTypes } from "../../components/training-types/training-types";
import { LearningLevelDescriptions } from "../../components/learning-level-descriptions/learning-level-descriptions";

export default function Learning({ categories }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <LearningSearch />

        <LearningTicks />

        <CourseCategoriesGrid
          productCategories={categories}
          overlayColor="rgba(138,217,202,0.2)"
          textBackground="rgba(138,217,202,0.8)"
          textColor="#ffffff"
          objectFit={"contain"}
        />
        <div className={styles.buttonContainer}>
          <Button
            className={styles.button}
            href="https://acecentre.arlo.co/w/events/"
          >
            View all courses
          </Button>
        </div>
        <TrainingTypes />
        <LearningLevelDescriptions />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      seo: {
        title: "Ace Centre Learning",
        description:
          "Our courses focus on the use of Assistive Technology to enable independence, access to education, learning and leisure activities, and communication.",
      },
    },
  };
};
