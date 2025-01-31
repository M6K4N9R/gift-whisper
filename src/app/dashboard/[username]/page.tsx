"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  // Check session

  const { status } = useSession();
  const router = useRouter();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <button
          className="border border-solid border-black rounded"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
        >
          Sign Out
        </button>
      );
    } else if (status === "loading") {
      return <span className="text-[#888] text-sm mt-7">Loading...</span>;
    } else {
      return (
        <Link
          href="/login"
          className="border border-solid border-black rounded"
        >
          Sign In
        </Link>
      );
    }
  };

  return (
    <div>
      {showSession()}

      {/* Add more user information as needed */}
    </div>

    // <section className="p-6 max-w-2xl mx-auto">
    //   <div className="flex flex-col items-center">
    //     <div className="relative">
    //       {/* <img
    //         src={user.image || "/default-profile.png"}
    //         alt={`${user.name || "User"}'s profile`}
    //         className="w-32 h-32 rounded-full border border-dark-accent-700"
    //       /> */}
    //       <button className="absolute bottom-0 right-0 bg-primary-700 text-white p-2 rounded-full">
    //         Add Photo
    //       </button>
    //     </div>
    //     <h1 className="text-3xl font-bold mt-4">{user.name || "User"}</h1>
    //     <div className="mt-6 flex gap-4">
    //       <Link href={`/${params.user}#archive`}>
    //         <button className="bg-secondary-700 text-white px-4 py-2 rounded-lg">
    //           Archive
    //         </button>
    //       </Link>
    //       <button className="bg-primary-700 text-white px-4 py-2 rounded-lg">
    //         Create List
    //       </button>
    //     </div>
    //   </div>
    // </section>
  );
}
