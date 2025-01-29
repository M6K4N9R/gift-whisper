import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signup } from "@/app/actions/auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.name
        ) {
          return null;
        }

        // Use the signup function for both signup and login
        const user = await signup(credentials);

        if (user) {
          return user; // NextAuth expects a user object or null
        }
        return null;
      },
    }),
  ],
  // Add other NextAuth options as needed
});

export { handler as GET, handler as POST };
