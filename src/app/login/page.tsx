"use client";

import { signIn, getSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError(res.error as string);
      console.log("Something went wrong");
    }

    if (res?.ok) {
      const session = await getSession();
      if (session?.user?.name) {
        console.log("All is ok");

        return router.push(`/${encodeURIComponent(session.user.name)}`);
      } else {
        return router.push("/");
      }
    }
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        className="p-6 w-full max-w-md flex flex-col justify-between items-center gap-4 
        bg-dark-accent-800 text-foreground rounded-lg"
        onSubmit={handleSubmit}
      >
        {error && <div className="text-red-500 w-full">{error}</div>}
        <h1 className="mb-5 w-full text-2xl font-bold font-gelica text-center">
          Sign In
        </h1>
        <div className="w-full">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 bg-dark-accent-700 border-dark-accent-700 text-foreground rounded-lg"
            name="email"
          />
        </div>
        <div className="w-full">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 bg-dark-accent-700 border-dark-accent-700 text-foreground rounded-lg"
            name="password"
          />
        </div>
        <button className="w-full px-4 py-2 bg-primary-700 hover:bg-primary-600 text-foreground rounded-lg">
          Sign In
        </button>
        <Link
          href="/register"
          className="text-secondary-900 hover:text-secondary-700"
        >
          Don&apos;t have an account?
        </Link>
      </form>
    </section>
  );
}
