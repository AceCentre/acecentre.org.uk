import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { LoginAndRegisterBoxes } from "../components/login-and-register-boxes/login-and-register-boxes";
import { defaultNavItems } from "../components/sub-nav/sub-nav-items";
import withSession from "../lib/auth/with-session";
import { useGlobalProps } from "../lib/global-props/hook";

export default function LoginPage() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <LoginAndRegisterBoxes />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withSession(async function ({ req }) {
  const user = req.session.get("user");

  if (user && user.authToken) {
    return {
      redirect: {
        destination: "/my-acecentre",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});
