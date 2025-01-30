import type { NextAuthConfig } from "next-auth";

export const config = {
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
