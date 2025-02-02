"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function SignupForm() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await signIn("credentials", {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      redirect("/login");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 w-full max-w-md flex flex-col justify-between items-center gap-4 bg-dark-accent-800 text-foreground rounded-lg"
    >
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        name="name"
        placeholder="Name put in"
        required
        className="text-dark-accent-900"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="text-dark-accent-900"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="text-dark-accent-900"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

// ================================================= PREVIOUS CODE

// "use client";

// import { FormEvent, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { register } from "@/app/lib/actions";

// export default function Register() {
//   const [error, setError] = useState<string>();
//   const router = useRouter();
//   const ref = useRef<HTMLFormElement>(null);

//   const handleSubmit = async (formData: FormData) => {
//     const r = await register({
//       email: formData.get("email"),

//       password: formData.get("password"),

//       name: formData.get("name"),
//     });

//     ref.current?.reset();

//     if (r?.error) {
//       setError(r.error);

//       return;
//     } else {
//       return router.push("/login");
//     }
//   };

//   return (
//     <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <form
//         ref={ref}
//         action={handleSubmit}
//         className="p-6 w-full max-w-md flex flex-col justify-between items-center gap-4
//         bg-dark-accent-800 text-foreground rounded-lg"
//       >
//         {error && <div className="text-red-500 w-full">{error}</div>}
//         <h1 className="mb-5 w-full text-2xl font-bold font-gelica text-center">
//           Sign Up
//         </h1>

//         <div className="w-full">
//           <label className="block mb-2">Full Name</label>
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full p-2 bg-dark-accent-700 border-dark-accent-700 text-foreground rounded-lg"
//             name="name"
//           />
//         </div>

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
//           className="w-full px-4 py-2 bg-primary-700 hover:bg-primary-600 text-foreground rounded-lg mt-4"
//         >
//           Sign up
//         </button>

//         <Link
//           href="/login"
//           className="text-secondary-900 hover:text-secondary-700 mt-2"
//         >
//           Already have an account?
//         </Link>
//       </form>
//     </section>
//   );
// }
