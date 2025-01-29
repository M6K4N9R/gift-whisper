'use server'

import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/actions/mongodb";
import User from "@/models/User";
import { createSession } from "../lib/session";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Library's API
  try {
    await connectDB();

    const userFound = await User.findOne({ email });

    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    console.log("User created: ", savedUser);
    await createSession(savedUser._id);
    redirect("/[username]");
  } catch (e) {
    console.log(e);
  }

  // 4. Create user session

  // 5. Redirect user
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
