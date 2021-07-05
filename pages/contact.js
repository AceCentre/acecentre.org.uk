import { CombinedNav } from "../components/combined-nav/combined-nav";
import { ContactCards } from "../components/contact-cards/contact-cards";
import { FindOurOffices } from "../components/find-our-offices/find-our-offices";
import { Footer } from "../components/footer/footer";
import { Form } from "../components/form/form";
import { PageTitle } from "../components/page-title/page-title";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { useCartCount } from "../lib/cart/use-cart-count";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";
import { formium } from "../lib/formium";

export default function Contact({ slug, form }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle
          heading="Contact us"
          description="If you think Ace Centre can help you or someone you know please get in touch"
        />
        <ContactCards />
        <Form form={form} slug={slug} formium={formium} />
        <FindOurOffices />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const slug = "contact";
  const form = await formium.getFormBySlug(slug);

  return { props: { slug, form } };
});
