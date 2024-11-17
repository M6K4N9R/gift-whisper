
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Search from './UserSearch';

interface SharedMenuProps {
  logo: React.ReactNode;
  onSearch: (query: string) => void; // Continue with handling search
}

const SharedMenu: React.FC<SharedMenuProps> = ({ logo, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent, searchQuery) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
        {logo}
      </div>
      <Search onSearch={handleSearch}/>
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
