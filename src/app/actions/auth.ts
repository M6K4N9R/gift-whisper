'use server'

import { SignupFormSchema } from "@/app/lib/definitions";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/actions/mongodb";
import User from "@/models/User";

export async function signup(credentials: Record<"email" | "password" | "name", string>) {
  const validatedFields = SignupFormSchema.safeParse(credentials);

  if (!validatedFields.success) {
    return null; // Return null if validation fails
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return null; // Return null if user already exists
    }
    
    const user = new User({ name, email, password: hashedPassword });
    const savedUser = await user.save();

    // Return user object without sensitive information
    return {
      id: savedUser._id.toString(),
      name: savedUser.name,
      email: savedUser.email
    };
  } catch (e) {
    console.error(e);
    return null; // Return null if an error occurs
  }
}


// =============================================================== OLD CODE

// import { connectDB } from "@/app/actions/mongodb";

// import User from "@/models/User";

// import type { NextAuthOptions } from "next-auth";

// import credentials from "next-auth/providers/credentials";

// import bcrypt from "bcryptjs";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     credentials({
//       name: "Credentials",

//       id: "credentials",

//       credentials: {
//         email: { label: "Email", type: "text" },

//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         await connectDB();

//         const user = await User.findOne({
//           email: credentials?.email,
//         }).select("+password");

//         console.log("User found: ", user);

//         if (!user) throw new Error("Wrong Email");

//         const passwordMatch = await bcrypt.compare(
//           credentials!.password,

//           user.password
//         );

//         if (!passwordMatch) throw new Error("Wrong Password");
//         console.log("User in Authorize function", user);
//         return user;
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       console.log("JWT callback - user: ", user);
//       console.log("JWT callback - token: ", token);

//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       console.log("Session callback - session: ", session);
//       console.log("Session callback - token: ", token);
//       if (token && session.user) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//     error: "/auth/error",
//   },
// };
