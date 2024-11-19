import Link from "next/link";
import { useState } from "react";
import UserSearch from "./UserSearch";
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
      <UserSearch onSearch={handleSearch} />
      <div className="flex justify-between gap-3">
        <Link href="/login">
          <Button variant="secondary">Log in</Button>
        </Link>
        <Link href="/signup">
          <Button variant="primary">Sign up</Button>
        </Link>
        
      </div>
    </div>
  );
};

export default SharedMenu;
