import { withIronSession } from "next-iron-session";

function handler(req, res, session) {
  req.session.destroy();
  res.send({loggedIn: false});
}

export default withIronSession(handler, {
  password: process.env.NEXT_IRON_SESSION_PASSWORD,
  cookieName: "user",
  cookieOptions: {
    secure: false
  },
});
