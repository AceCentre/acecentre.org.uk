import withSession from "../../../lib/auth/with-session";
import { refreshToken } from "../../../lib/auth/refresh-token";
import { getUser } from "../../../lib/auth/get-user";

async function handler(req, res) {
  await refreshToken(req);

  try {
    const user = await getUser(req);

    res.send({ user });
  } catch (error) {
    return res.send({ error });
  }
}

export default withSession(handler);
