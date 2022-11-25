import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalPropsNoRevalidateNoRevalidate } from "../../lib/global-props/inject";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getTemplates } from "../../lib/launchpad";
import { LaunchpadList } from "../../components/resource-list/resource-list";

import styles from "../../styles/launchpad.module.css";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { ResourcesImage } from "../../components/resources-image/resources-image";
import { ResourcesDescription } from "../../components/resources-description/resources-description";
import { ResourcesShare } from "../../components/resources-share/resources-share";
import { LaunchpadGenerate } from "../../components/launchpad-generate/launchpad-generate";

export default function LaunchpadDetail({ template, templates }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink where="launchpad" href="/launchpad" />
        <div className={styles.topArea}>
          <div className={styles.leftTopArea}>
            <ResourcesImage
              resource={{
                name: template.templateName,
                image: { src: template.templateImageUrl },
              }}
              priority
            />
          </div>
          <div className={styles.rightTopArea}>
            <ResourcesDescription
              resource={{
                name: template.templateName,
                shortDescription: template.templateDescription,
              }}
            />
          </div>
        </div>
        <LaunchpadGenerate template={template} />
        <div className={styles.share}>
          <ResourcesShare />
        </div>
        <LaunchpadList title="Other templates" templates={templates} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalPropsNoRevalidateNoRevalidate(
  async ({ params: { slug } }) => {
    const templates = await getTemplates();
    const template = templates.find((template) => template.templateId === slug);

    const otherTemplates = templates.filter((x) => x.templateId !== slug);

    return {
      props: {
        template,
        templates: otherTemplates,
        seo: {
          noIndex: true,
        },
      },
    };
  }
);
