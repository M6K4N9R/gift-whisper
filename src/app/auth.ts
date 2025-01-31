import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import User, { UserDocument } from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "./lib/mongodb";

export async function getUser(
  email: string
): Promise<UserDocument | undefined> {
  try {
    await connectDB();
    const user = await User.findOne({ email: email }).select("+password");
    console.log("getUser(). User is: ", user);
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  // ============ Read about NextAuth and signIn/Out and auth functions
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
