import { getUser } from "../lib/auth/get-user";
import { refreshToken } from "../lib/auth/refresh-token";
import withSession from "../lib/auth/with-session";

export default function UserPage({ user }) {
  //  Bailing but a redirect will happen
  if (user === null) return <></>;

  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}

// Redirect if you are signed out
export const getServerSideProps = withSession(async function ({ req, res }) {
  await refreshToken(req);
  try {
    const user = await getUser(req);

    if (!user) throw new Error("not signed in");

    return { props: { user } };
  } catch (e) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: { user: null } };
  }
});
