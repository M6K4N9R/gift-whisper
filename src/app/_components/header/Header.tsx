import Link from "next/link";
import Image from "next/image";
import UserSearch from "./UserSearch";
import MobileSearch from "./MobileSearch";
import Button from "../Button";
import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void; // Continue with handling search
}

const Header: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent, searchQuery: string) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  return (
    <header className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 min-w-5 mr-2">
            <Link href="/">
              {/* Desktop Logo */}
              <Image
                src="/logo/logo-blue-dark.png"
                alt="Gift Whisper Logo"
                width={200}
                height={50}
                className="hidden md:block"
              />
            </Link>
            <Link href="/">
              {/* Mobile Logo */}
              <Image
                src="/logo/logo-text-blue-670by120.png"
                alt="Gift Whisper Logo"
                width={150}
                height={50}
                className="block md:hidden"
              />
            </Link>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="hidden md:block mx-4">
              <UserSearch onSearch={handleSearch} />
            </div>
            <div className="md:hidden">
              <MobileSearch onSearch={handleSearch} />
            </div>
            <div className="flex justify-between gap-3">
              <Link href="/login">
                <Button variant="secondary">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
