import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";

import { CombinedNav } from "../../components/combined-nav/combined-nav";
import styles from "../../styles/form.module.css";
import { ALL_FORMS, MsForm } from "../../components/ms-form";

export default function FormPage({ form }) {
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
      <Footer />
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

export const getStaticProps = async ({ params: { slug } }) => {
  const form = ALL_FORMS.find((current) => current.slug === slug);

  if (!form) {
    return { notFound: true };
  }

  return {
    props: {
      slug,
      form,
      seo: { title: form.title },
    },
  };
};
