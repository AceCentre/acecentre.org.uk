import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { formium } from "../../lib/formium";

import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Form } from "../../components/form/form";

export default function FormPage({ slug, form }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <Form form={form} slug={slug} formium={formium} />
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
