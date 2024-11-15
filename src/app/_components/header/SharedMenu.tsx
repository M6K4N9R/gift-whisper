// components/header/SharedMenu.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SharedMenuProps {
  logo: React.ReactNode;
  onSearch: (query: string) => void; // Continue with handling search
}

const SharedMenu: React.FC<SharedMenuProps> = ({ logo, onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
        {logo}
      </div>
      <form onSubmit={handleSearch} className="flex-grow mx-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="border rounded-md p-2 w-full"
        />
      </form>
      <div className="flex space-x-4">
        <Link href="/login" className="text-gray-500 hover:text-gray-900">
          Log In
        </Link>
        <Link href="/signup" className="text-gray-500 hover:text-gray-900">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SharedMenu;
