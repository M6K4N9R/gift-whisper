import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface NavItems {
  label: string;
  href: string;
}

interface UserInfo {
  name: string;
  avatar: string;
}

interface HeaderProps {
  logo?: React.ReactNode;
  navItems: NavItems[];
  userInfo?: UserInfo;
}

const Header: React.FC<HeaderProps> = ({ logo, navItems, userInfo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {logo ? (
                logo
              ) : (
                <Link href="/">
                  <span className="text-xl font-bold text-secondary-900">Gift Whisper</span>
                </Link>
              )}
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            {userInfo ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={userInfo.avatar}
                      alt={userInfo.name}
                      width={32}
                      height={32}
                    />
                  </button>
                </div>
                {/* Add dropdown menu here if needed */}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Log in
              </Link>
            )}
          </div>
          {/* Mobile menu button */}
          {/* ... (rest of the component remains largely the same) ... */}
        </div>
      </div>
      {/* Mobile menu */}
      {/* ... (rest of the component remains largely the same) ... */}
    </header>
  );
};

export default Header;