import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import withSession from "../../lib/auth/with-session";
import { useGlobalProps } from "../../lib/global-props/hook";

export default function OrderPage({ orderId }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle heading="Order details" description={`Order #${orderId}`} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withSession(
  async ({ params: { id: orderId } }) => {
    return {
      props: { orderId },
    };
  }
);
