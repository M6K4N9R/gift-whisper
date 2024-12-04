import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import Link from "next/link";

async function getUserData(username: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.name !== username) {
    redirect("/login");
  }
  return session.user;
}

const UserProfile = async ({
  params,
}: {
  params: { username: Promise<string> };
}) => {
  const username = await params.username;
  const user = await getUserData(username);

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={user.image || "/default-profile.png"}
            alt={`${user.name || "User"}'s profile`}
            className="w-32 h-32 rounded-full border border-dark-accent-700"
          />
          <button className="absolute bottom-0 right-0 bg-primary-700 text-white p-2 rounded-full">
            Add Photo
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-4">{user.name || "User"}</h1>
        <div className="mt-6 flex gap-4">
          <Link href={`/${params.username}#archive`}>
            <button className="bg-secondary-700 text-white px-4 py-2 rounded-lg">
              Archive
            </button>
          </Link>
          <button className="bg-primary-700 text-white px-4 py-2 rounded-lg">
            Create List
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
