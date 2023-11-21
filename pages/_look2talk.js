import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";

import styles from "../styles/look2talk.module.css";

import { getPage } from "../lib/generic-pages/get-page";

export default function LookToTalk({ page }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <div className={styles.container}>
          <div
            className={styles.pageContent}
            dangerouslySetInnerHTML={{ __html: page.content }}
          ></div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const page = await getPage("look2talk");

  return {
    revalidate: 60,
    props: {
      page,

      seo: {
        title: "Look2Talk",
      },
    },
  };
};
