import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import { CombinedNav } from "../../components/combined-nav/combined-nav";
import styles from "../../styles/form.module.css";
import { ALL_FORMS, MsForm } from "../../components/ms-form";

export default function FormPage({ form }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <div className={styles.container}>
          <MsForm form={form} />
        </div>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export async function getStaticPaths() {
  const paths = ALL_FORMS.map((form) => ({ params: { slug: form.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const form = ALL_FORMS.find((current) => current.slug === slug);

  return {
    props: {
      slug,
      form,
      seo: { title: form.title },
    },
  };
});
