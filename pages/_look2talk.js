import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";

import styles from "../styles/look2talk.module.css";

import { getPage } from "../lib/generic-pages/get-page";

export default function LookToTalk({ page }) {
  const { currentYear } = useGlobalProps();

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
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const page = await getPage("look2talk");

  return {
    props: {
      page,

      seo: {
        title: "Look2Talk",
      },
    },
  };
});
