import type { NextAuthConfig } from "next-auth";
// import { convertName } from "./src/app/utils/helperFunctions";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // const username = convertName(auth.user.name) || "default";

        return Response.redirect(new URL(`/dashboard`, nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
