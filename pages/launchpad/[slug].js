import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getTemplates } from "../../lib/launchpad";

export default function LaunchpadDetail({ template }) {
  const { currentYear } = useGlobalProps();

  console.log(template);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent"></main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export async function getStaticPaths() {
  const templates = await getTemplates();

  return {
    paths: templates.map((template) => ({
      params: {
        slug: template.templateId,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const templates = await getTemplates();
  const template = templates.find((template) => template.templateId === slug);

  return {
    props: {
      template,
      seo: {
        noIndex: true,
      },
    },
  };
});
