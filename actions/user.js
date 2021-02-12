import { withIronSession } from "next-iron-session";

export const withUserSession = (fetchData) => withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }

    if (fetchData) {
      const data = await fetchData();
      return {
        props: { data }
      };
    }

    return {
      props: { user }
    }
  },
  {
    password: process.env.NEXT_IRON_SESSION_PASSWORD,
    cookieName: "user",
    cookieOptions: {
      secure: false
    },
  }
);
