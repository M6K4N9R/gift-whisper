import { connectDB } from "@/app/lib/mongodb";

import User from "@/models/User";

import type { NextAuthOptions } from "next-auth";

import credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",

      id: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },

        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,

          user.password
        );

        if (!passwordMatch) throw new Error("Wrong Password");

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
};

// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
// import Credentials from "next-auth/providers/credentials";
// import { z } from "zod";
// import User, { UserDocument } from "@/models/User";
// import bcrypt from "bcryptjs";
// import { connectDB } from "./src/app/lib/mongodb";

// export async function getUser(
//   email: string
// ): Promise<UserDocument | undefined> {
//   try {
//     await connectDB();
//     const user = await User.findOne({ email: email }).select("+password");
//     console.log("getUser(). User is: ", user);
//     return user;
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }

// export const { auth, signIn, signOut } = NextAuth({
//   // ============ Read about NextAuth and signIn/Out and auth functions
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);

//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const user = await getUser(email);
//           if (!user) return null;
//           const passwordsMatch = await bcrypt.compare(password, user.password);
//           if (passwordsMatch) return user;
//         }
//         console.log("Invalid credentials");
//         return null;
//       },
//     }),
//   ],
// });
