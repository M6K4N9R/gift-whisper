import { useState } from "react";
import Link from "next/link";
import CreateListForm from "../_components/forms/CreateListForm";

const UserProfile = ({ user }) => {
  const [isCreateListOpen, setCreateListOpen] = useState(false);

  const handleCreateList = () => {
    setCreateListOpen(true);
  };

  const handleCloseCreateList = () => {
    setCreateListOpen(false);
  };

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={user.profilePicture || "/default-profile.png"}
            alt={`${user.name}'s profile`}
            className="w-32 h-32 rounded-full border border-dark-accent-700"
          />
          <button className="absolute bottom-0 right-0 bg-primary-700 text-white p-2 rounded-full">
            Add Photo
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
        <div className="mt-6 flex gap-4">
          <Link href={`/${user.username}#archive`}>
            <button className="bg-secondary-700 text-white px-4 py-2 rounded-lg">
              Archive
            </button>
          </Link>
          <button
            onClick={handleCreateList}
            className="bg-primary-700 text-white px-4 py-2 rounded-lg"
          >
            Create List
          </button>
        </div>
      </div>

      {isCreateListOpen && <CreateListForm onClose={handleCloseCreateList} />}
    </section>
  );
};

export default UserProfile;
