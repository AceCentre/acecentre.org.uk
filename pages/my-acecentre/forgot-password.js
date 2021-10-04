import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { ResetPasswordForm } from "../../components/reset-password-form/reset-password-form";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import withSession from "../../lib/auth/with-session";
import { useGlobalProps } from "../../lib/global-props/hook";

export default function ChangePassword() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <ResetPasswordForm />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

// Redirect if you are signed in
export const getServerSideProps = withSession(async () => {
  return { props: {} };
});
