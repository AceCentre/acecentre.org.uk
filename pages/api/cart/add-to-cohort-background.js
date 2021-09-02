import withSession from "../../../lib/auth/with-session";

const wait = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));

async function handler(req, res) {
  await wait(60);
  await res.send({ success: true });
}

export default withSession(handler);
