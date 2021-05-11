import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllStaff } from "../../lib/staff/get-staff";

export default function StaffPage({ allStaff }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allStaff = await getAllStaff();

  return { props: { allStaff } };
});
