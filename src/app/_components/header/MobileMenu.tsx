import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface MobileMenuNavItems {
  label: string;
  href: string;
}

interface UserInfo {
  name: string;
  avatar: string;
}

interface MobileMenuProps {
  logo?: React.ReactNode;
  navItems: MobileMenuNavItems[];
  userInfo?: UserInfo;
}

const MobileMenu: React.FC<MobileMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
      >
        <span className="sr-only">Open main menu</span>
        <Image src={"/hamburger.svg"} alt="Mobile menu" height={24} width={24} />
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>
            {/* Add more menu items */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
