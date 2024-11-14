import Link from "next/link";
import Image from "next/image";

interface UserInfo {
  name: string;
  avatar: string;
}

interface DesktopMenuProps {
  userInfo?: UserInfo;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ userInfo }) => {
  return (
    <>
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
    </>
  );
};

export default DesktopMenu;
