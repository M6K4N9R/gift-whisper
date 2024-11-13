import Link from "next/link";
import Image from "next/image";

interface DesktopMenuNavItems {
  label: string;
  href: string;
}

interface UserInfo {
  name: string;
  avatar: string;
}

interface DesktopMenuProps {
  logo?: React.ReactNode;
  navItems: DesktopMenuNavItems[];
  userInfo?: UserInfo;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({
  logo,
  navItems,
  userInfo,
}) => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            {logo ? (
              logo
            ) : (
              <Link href="/">
                <Image
                  src="/logo/logo-white-bg-880by160.png"
                  alt="Gift Whisper Logo"
                  width={200}
                  height={50}
                />
              </Link>
            )}
          </div>
          <nav className="hidden md:flex flex-1 justify-end mx-6 space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-dark-accent-500 hover:text-dark-accent-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
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
                {/* Dropdown menu here if needed */}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-dark-accent-500 hover:text-primary-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopMenu;
