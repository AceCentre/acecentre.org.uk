import { Button } from "../components/button/button";
import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { PageTitle } from "../components/page-title/page-title";
import { defaultNavItems } from "../components/sub-nav/sub-nav-items";
import { useLogout } from "../lib/auth/hooks";
import withSession from "../lib/auth/with-session";
import { useGlobalProps } from "../lib/global-props/hook";

import styles from "../styles/my-acecentre.module.css";

export default function LoginPage({ user }) {
  const { currentYear } = useGlobalProps();
  const { doLogout, logoutAllowed, error: logoutError } = useLogout();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle heading="My AceCentre" description="Dashboard">
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
        <pre>{JSON.stringify(user, null, 2)}</pre>
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

  return {
    props: { user: { userId: user.userId, customerId: user.customerId } },
  };
});
