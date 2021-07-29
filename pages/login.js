import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav-items";
// import { useLogin } from "../lib/auth/hooks";
import withSession from "../lib/auth/with-session";
import { useGlobalProps } from "../lib/global-props/hook";

export default function LoginPage() {
  // const { loginFormSubmit, readyForLogin, loginError } = useLogin();
  const { currentYear } = useGlobalProps();

  // return (
  //   <>
  //     {loginError && <p>{loginError}</p>}
  //     <form onSubmit={loginFormSubmit}>
  //       <label htmlFor="username"> Username</label>
  //       <input name="username"></input>
  //       <label htmlFor="password">Password</label>
  //       <input name="password"></input>
  //       <button type="submit" disabled={!readyForLogin}>
  //         Login
  //       </button>
  //     </form>
  //   </>
  // );

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main></main>
      <Footer currentYear={currentYear} />
    </>
  );
}

// Redirect if you are signed in
export const getServerSideProps = withSession(async function ({ req }) {
  const user = req.session.get("user");

  if (user && user.authToken) {
    return {
      redirect: {
        destination: "/user",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});
