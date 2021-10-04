import {
  BillingDetails,
  ShippingDetails,
} from "../../components/address-field/address-field";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import { getAddresses } from "../../lib/auth/get-user";
import withSession from "../../lib/auth/with-session";
import { useGlobalProps } from "../../lib/global-props/hook";

import styles from "../../styles/addresses.module.css";

export default function Addresses({
  billingDetails,
  shippingDetails,
  countries,
}) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="My addresses"
          description="Manage your billing and shipping address"
        />
        <div className={styles.splitColumns}>
          <BillingDetails details={billingDetails} countries={countries} />
          <ShippingDetails details={shippingDetails} countries={countries} />
        </div>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

// Redirect if you are signed in
export const getServerSideProps = withSession(async function ({ req }) {
  const user = req.session.get("user");

  if (!user || !user.authToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { billingDetails, shippingDetails, countries } = await getAddresses(
    req,
    user
  );

  return {
    props: { billingDetails, shippingDetails, countries },
  };
});
