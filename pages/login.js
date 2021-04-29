import { useLogin } from "../lib/auth/hooks";
import withSession from "../lib/auth/with-session";

export default function LoginPage() {
  const { loginFormSubmit, readyForLogin, loginError } = useLogin();

  return (
    <>
      {loginError && <p>{loginError}</p>}
      <form onSubmit={loginFormSubmit}>
        <label htmlFor="username"> Username</label>
        <input name="username"></input>
        <label htmlFor="password">Password</label>
        <input name="password"></input>
        <button type="submit" disabled={!readyForLogin}>
          Login
        </button>
      </form>
    </>
  );
}

// Redirect if you are signed in
export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user && user.authToken) {
    res.setHeader("location", "/user");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: {},
  };
});
