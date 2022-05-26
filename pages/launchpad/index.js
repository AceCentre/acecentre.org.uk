import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { LaunchpadList } from "../../components/resource-list/resource-list";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getTemplates } from "../../lib/launchpad";

import styles from "../../styles/launchpad.module.css";

export default function Launchpad({ templates }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <div className={styles.main}>
          <h1>AAC Launchpad</h1>
          <p>This is an early prototype of AAC Launchpad.</p>
        </div>

        <LaunchpadList title="Templates" templates={templates} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalProps(async () => {
  const templates = await getTemplates();

  return {
    props: {
      templates,
      seo: {
        dontIndex: true,
      },
    },
  };
});
