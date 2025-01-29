import { signup } from "@/app/actions/auth";

import NextAuth from "next-auth";

const handler = NextAuth(signup);

export { handler as GET, handler as POST };
