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
      <button onClick={toggleSearch} className="md:hidden">
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
            <div className="bg-dark rounded-lg p-1 w-full max-w-md">
              <UserSearch
                onSearch={(query) => {
                  onSearch(query);
                  setIsOpen(false);
                }}
              />
              <button
                onClick={toggleSearch}
                className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default MobileSearch;
