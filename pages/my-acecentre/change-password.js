import SvgIcon from "@material-ui/core/SvgIcon";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import withSession from "../../lib/auth/with-session";
import { useGlobalProps } from "../../lib/global-props/hook";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import styles from "../../styles/my-acecentre.module.css";
import { changePassword } from "../../lib/auth/get-user";

export default function ChangePassword() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main className={styles.changePasswordContainer}>
        <SvgIcon className={styles.changePasswordIcon}>
          <MailOutlineIcon />
        </SvgIcon>
        <p>
          We have sent you a password reset email. Please check your spam inbox.
        </p>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

// Redirect if you are signed in
export const getServerSideProps = withSession(async ({ req }) => {
  const user = req.session.get("user");

  if (!user || !user.authToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  await changePassword(req, user);

  return { props: {} };
});
