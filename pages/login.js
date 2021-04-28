import { useLogin } from "../lib/auth/hooks";

export default function LoginPage() {
  const { loginFormSubmit, readyForLogin, loginError } = useLogin();

  return (
    <>
      {loginError && <p>{loginError}</p>}
      <form onSubmit={loginFormSubmit}>
        <label>Username</label>
        <input name="username"></input>
        <label>Password</label>
        <input name="password"></input>
        <button type="submit" disabled={!readyForLogin}>
          Login
        </button>
      </form>
    </>
  );
}
