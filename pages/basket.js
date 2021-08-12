import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { PageTitle } from "../components/page-title/page-title";
import { defaultNavItems } from "../components/sub-nav/sub-nav-items";
import { BasketTable } from "../components/table/table";
import withSession from "../lib/auth/with-session"; // import { getCart } from "../lib/cart/get";
import { getCart } from "../lib/cart/get";
import { useGlobalProps } from "../lib/global-props/hook";

export default function Basket({ rawBasket }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle
          heading="Checkout"
          description="Here's a summary of your order"
        />
        <BasketTable />
        <pre>{JSON.stringify(rawBasket, null, 2)}</pre>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withSession(async function ({ req }) {
  const rawBasket = await getCart(req);

  return {
    props: {
      rawBasket: JSON.parse(JSON.stringify(rawBasket)),
    },
  };
});
