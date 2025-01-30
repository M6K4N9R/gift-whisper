




// ===================================================================== OLD CODEs

// "use server";

// import { connectDB } from "@/app/actions/mongodb";
// import { signIn } from "next-auth/react";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export const register = async (values: any) => {
//   const { email, password, name } = values;

//   try {
//     await connectDB();

//     const userFound = await User.findOne({ email });

//     if (userFound) {
//       return {
//         error: "Email already exists!",
//       };
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const savedUser = await user.save();
//   } catch (e) {
//     console.log(e);
//   }
// };

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid Credentials.";
//         default:
//           "Something went wrong";
//       }
//     }
//     throw error;
//   }
// }



// =============================================================== OLD CODE from auth.ts

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


//=================================================================== OLD Code from api/auth/[...nextauth]/route.ts

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

