import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { getGuideProducts } from "../../lib/activity-book";
import { ResourceList } from "../../components/resource-list/resource-list";
import styles from "../../styles/activity-book.module.css";

export default function AllGuides({ guides }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink where="home" href="/" />

        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Guide Library</h1>
            <p>
              Discover our collection of helpful guides for communication,
              activities, and learning. Each guide can be customized to meet
              your specific needs.
            </p>
          </div>

          <ResourceList
            title="Available Guides"
            products={guides}
            className={styles.guidesList}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const guides = await getGuideProducts();

  if (!guides) throw new Error("Could not get all the guides");

  return {
    revalidate: 60,
    props: {
      guides,
      seo: {
        title: "Guide Library - Ace Centre",
        description:
          "Discover our collection of helpful guides for communication, activities, and learning.",
        image: {
          src: "/images/guide-library.jpg",
          alt: "Guide Library",
        },
      },
    },
  };
};
