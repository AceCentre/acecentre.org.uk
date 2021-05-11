import { FilterPeople } from "../../components/filter-people/filter-people";
import { Footer } from "../../components/footer/footer";
import { MeetOurPeople } from "../../components/meet-our-people/meet-our-people";
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
        <MeetOurPeople />
        <FilterPeople />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allStaff = await getAllStaff();

  return { props: { allStaff } };
});
