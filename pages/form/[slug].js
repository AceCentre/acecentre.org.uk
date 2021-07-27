import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { formium } from "../../lib/formium";

import { CombinedNav } from "../../components/combined-nav/combined-nav";
import styles from "../../styles/form.module.css";

import Iframe from "react-iframe";
import { useEffect, useState } from "react";

// eslint-disable-next-line no-unused-vars
export default function FormPage({ slug, form }) {
  const { currentYear } = useGlobalProps();

  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  if (!clientSide) return null;

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <div className={styles.container}>
          <Iframe
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrAMkFY0VGxNInNkKbPsrRolUM09NTDlHMUIxSEZMV1dNNVdNMURCOFIxSS4u&embed=true"
            width="100%"
            height="800px"
            allowFullScreen
            styles={{ border: "none", maxWidth: "100%", maxHeight: "100vh" }}
          />
        </div>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await formium.findForms();
  const paths = data.map((form) => ({ params: { slug: form.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const form = await formium.getFormBySlug(slug);

  return {
    props: {
      slug,
      form,
    },
  };
});
