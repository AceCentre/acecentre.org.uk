import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { TrusteeList } from "../../components/trustee-list/trustee-list";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllTrustees } from "../../lib/trustees/get-trustees";
import styles from "../../styles/trustees.module.css";

export default function AllTrusteesPage({ allTrustees }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle
          heading="Our trustees"
          description="Meet the AceCentre trustees"
        />
        <div className={styles.container}>
          <h2>Meet our trustees</h2>
        </div>
        <TrusteeList trusteeList={allTrustees} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allTrustees = await getAllTrustees();

  return { props: { allTrustees } };
});
