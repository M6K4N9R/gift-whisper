import { useState } from "react";
import { createPortal } from "react-dom";
import UserSearch from "./UserSearch";

interface MobileSearchProps {
  onSearch: (query: string) => void;
}

const MobileSearch: React.FC<MobileSearchProps> = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => setIsOpen(!isOpen);

  return (
    <>
      <button onClick={toggleSearch} className="md:hidden flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-dark-accent-500 hover:text-primary-900"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
      {isOpen &&
        createPortal(
          <div className="fixed inset-x-0 top-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="flex justify-between bg-dark rounded-lg p-1 w-full max-w-md">
              <UserSearch
                onSearch={(query) => {
                  onSearch(query);
                  setIsOpen(false);
                }}
              />
              <button
                onClick={toggleSearch}
                className="bg-dark-accent-900 rounded-lg w-14 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F4F6F7"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default MobileSearch;
