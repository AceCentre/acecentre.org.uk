import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { DashboardCard } from "../../components/dashboard-card/dashboard-card";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import { useLogout } from "../../lib/auth/hooks";
import withSession from "../../lib/auth/with-session";
import { useGlobalProps } from "../../lib/global-props/hook";
import { getCourseCount } from "../../lib/products/get-courses";
import { getOrderCount } from "../../lib/products/get-orders";

import styles from "../../styles/my-acecentre.module.css";

export default function LoginPage({ orderCount, courseCount }) {
  const { currentYear } = useGlobalProps();
  const { doLogout, logoutAllowed, error: logoutError } = useLogout();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle heading="My Ace Centre" description="Dashboard">
          <div className={styles.buttonContainer}>
            <Button
              className={styles.button}
              onClick={doLogout}
              disabled={!logoutAllowed}
            >
              Logout
            </Button>
            {logoutError && <p className={styles.error}>{logoutError}</p>}
          </div>
        </PageTitle>
        <div className={styles.grid}>
          <DashboardCard
            title="My courses"
            count={courseCount}
            linkText="View your courses"
            linkUrl="/my-acecentre/courses"
            description="View a list of all the courses you are enrolled on. Select a course to be taken to the Moodle site for that course"
          />
          <DashboardCard
            title="My orders"
            count={orderCount}
            linkText="View your orders"
            linkUrl="/my-acecentre/orders"
            description="View a list of your orders. You can view all the purchase information for the transaction"
          />
          <DashboardCard
            description=""
            title="Addresses"
            linkText="Manage addresses"
            linkUrl="/my-acecentre/addresses"
          />
          <DashboardCard
            description=""
            title="Account details"
            linkText="Manage details"
            linkUrl="/my-acecentre/details"
          />
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

  const orderCount = await getOrderCount(req, user);
  const courseCount = await getCourseCount(req, user);

  if (orderCount === null || courseCount === null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: { userId: user.userId, customerId: user.customerId },
      orderCount,
      courseCount,
    },
  };
});
