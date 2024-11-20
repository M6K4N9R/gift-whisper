import React, { useState, useEffect } from "react";
import SharedMenu from "./SharedMenu";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="bg-transparent shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 min-w-5">
            <Link href="/">
              <Image
                src="/logo/logo-white-bg-880by160.png"
                alt="Gift Whisper Logo"
                width={200}
                height={50}
              />
            </Link>
          </div>

          <SharedMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;

// ================================================================ OLD WAY
// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";

// interface NavItems {
//   label: string;
//   href: string;
// }

// interface UserInfo {
//   name: string;
//   avatar: string;
// }

// interface HeaderProps {
//   logo?: React.ReactNode;
//   navItems: NavItems[];
//   userInfo?: UserInfo;
// }

// const Header: React.FC<HeaderProps> = ({ logo, navItems, userInfo }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0 flex items-center">
//             {logo ? (
//               logo
//             ) : (
//               <Link href="/">
//                 {/* <span className="text-xl font-bold text-secondary-900">Gift Whisper</span> */}
//                 <Image
//                   src="/logo/logo-white-bg-880by160.png"
//                   alt="Gift Whisper Logo"
//                   width={200}
//                   height={50}
//                 />
//               </Link>
//             )}
//           </div>
//           <nav className="hidden md:flex flex-1 justify-end mx-6 space-x-10">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="text-dark-accent-500 hover:text-dark-accent-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>
//           <div className="hidden md:ml-6 md:flex md:items-center">
//             {userInfo ? (
//               <div className="ml-3 relative">
//                 <div>
//                   <button
//                     type="button"
//                     className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     id="user-menu"
//                     aria-expanded="false"
//                     aria-haspopup="true"
//                   >
//                     <span className="sr-only">Open user menu</span>
//                     <Image
//                       className="h-8 w-8 rounded-full"
//                       src={userInfo.avatar}
//                       alt={userInfo.name}
//                       width={32}
//                       height={32}
//                     />
//                   </button>
//                 </div>
//                 {/* Add dropdown menu here if needed */}
//               </div>
//             ) : (
//               <Link
//                 href="/login"
//                 className="text-dark-accent-500 hover:text-primary-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
//               >
//                 Log in
//               </Link>
//             )}
//           </div>
//           {/* Mobile menu button */}
//           {/* ... (rest of the component remains largely the same) ... */}
//         </div>
//       </div>
//       {/* Mobile menu */}
//       {/* ... (rest of the component remains largely the same) ... */}
//     </header>
//   );
// };

// export default Header;
