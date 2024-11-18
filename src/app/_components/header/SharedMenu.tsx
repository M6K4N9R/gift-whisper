import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Search from "./UserSearch";
import Button from "../Button";

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
      <div className="flex items-center">{logo}</div>
      <Search onSearch={handleSearch} />
      <div className="flex justify-between gap-3">
        <Link href="/login">
          <Button variant="secondary">Log In</Button>
        </Link>
        <Link href="/signup">
          <Button variant="primary">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default SharedMenu;
