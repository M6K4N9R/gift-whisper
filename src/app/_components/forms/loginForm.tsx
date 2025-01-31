"use client";

import { signIn } from "@/app/auth";
// import { useActionState } from "react";
// import { authenticate } from "@/app/lib/actions";
// import { useSearchParams } from "next/navigation";
import Button from "../Button";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState();
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  // const [errorMessage, formAction, isPending] = useActionState(
  //   authenticate,
  //   undefined
  // );

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email: email as string,
      password: password as string,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      console.log("Login successful. Redirecting...");
      alert("Login successful! You will be redirected to your dashboard.");
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl text-dark-accent-900`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <Button
          className="mt-4 w-full text-dark-accent-900"
          type="submit"
          variant="primary"
        >
          Log in
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        ></div>
      </div>
    </form>
  );
}

//================================================================ Original LoginForm
// import { signIn, getSession } from "next-auth/react";
// import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// function convertName(name: string) {
//   const slug = name.toLocaleLowerCase().replace(" ", "-");
//   return slug;
// }

// export default function LoginForm() {
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const formData = new FormData(event.currentTarget);
//     console.log("FormData on loginPage: ", formData);
//     const res = await signIn("credentials", {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       redirect: false,
//     });

//     if (res?.error) {
//       setError(res.error as string);
//       console.log("Something went wrong");
//     }

//     if (res?.ok) {
//       const session = await getSession();
//       if (session?.user?.name) {
//         const username = convertName(session.user.name);
//         console.log("All is ok");

//         return router.push(`/${username}`);
//       } else {
//         return router.push("/");
//       }
//     }
//   };

//   return (
//     <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <form
//         className="p-6 w-full max-w-md flex flex-col justify-between items-center gap-4
//         bg-dark-accent-800 text-foreground rounded-lg"
//         onSubmit={handleSubmit}
//       >
//         {error && <div className="text-red-500 w-full">{error}</div>}
//         <h1 className="mb-5 w-full text-2xl font-bold font-gelica text-center">
//           Log In
//         </h1>
//         <div className="w-full">
//           <label className="block mb-2">Email</label>
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-2 bg-dark-accent-700 border-dark-accent-700 text-foreground rounded-lg"
//             name="email"
//           />
//         </div>
//         <div className="w-full">
//           <label className="block mb-2">Password</label>
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-2 bg-dark-accent-700 border-dark-accent-700 text-foreground rounded-lg"
//             name="password"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-primary-700 hover:bg-primary-600 text-foreground rounded-lg"
//         >
//           Log In
//         </button>
//         <Link
//           href="/register"
//           className="text-secondary-900 hover:text-secondary-700"
//         >
//           Don&apos;t have an account?
//         </Link>
//       </form>
//     </section>
//   );
// }
