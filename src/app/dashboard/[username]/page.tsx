import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getUser } from "../../../../auth";
import { convertName } from "@/app/utils/helperFunctions";

import Link from "next/link";

export default async function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  // Check session
  const session = await auth();
  console.log("Session: ", session);
  if (!session?.user) {
    redirect("/login");
  }

  // Check user
  const username = session?.user?.name
    ? convertName(session?.user.name)
    : "default";
  console.log("Converted User Name: ", username);
  const paramsUsername = params.username || "default";
  console.log("PArams username: ", paramsUsername);
  if (username !== paramsUsername) {
    redirect(`dashboard/${username}/`);
  }

  //fetch userData
  if (!user) {
    return <div>User Not Found</div>;
  }

  return (
    <div>
      <h1>Dashboard for {user.name}</h1>
      <p>Email: {user.email}</p>
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
