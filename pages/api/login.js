import { withIronSession } from "next-iron-session";

async function handler(req, res) {
  const { username, password } = JSON.parse(req.body);
  //do something with password, encrypt etc..
  req.session.set("user", { username });
  await req.session.save();
  res.send({ loggedIn: true });
}

export default withIronSession(handler, {
  password: process.env.NEXT_IRON_SESSION_PASSWORD,
  cookieName: "user",
  cookieOptions: {
    secure: false
  },
});
