import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav-items";
import withSession from "../lib/auth/with-session";
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
        <pre>{JSON.stringify(rawBasket, null, 2)}</pre>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withSession(async function ({ req }) {
  const rawBasket = await getCart(req);

  return {
    props: { rawBasket },
  };
});
