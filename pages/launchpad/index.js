import Link from "next/link";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getTemplates } from "../../lib/launchpad";

import styles from "../../styles/launchpad.module.css";

export default function Resources({ templates }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main className={styles.main} id="mainContent">
        <h1>AAC Launchpad</h1>
        <p>This is an early prototype of AAC Launchpad.</p>
        <p>Here are the available dynamic templates:</p>
        <ul>
          {templates.map((template) => {
            return (
              <li key={template.templateId}>
                <Link href={`/launchpad/${template.templateId}`}>
                  {template.templateName}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
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
