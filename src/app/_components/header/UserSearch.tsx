import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void; // Continue with functionality to handle search
}

const UserSearch: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setQuery("");
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="relative flex items-center w-full mx-4"
>
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search by name or email"
    className="w-full pl-4 pr-10 py-2 border rounded-md bg-dark-accent-100 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
  />
  <button 
    type="submit" 
    className="absolute right-3 top-1/2 transform -translate-y-1/2"
  >
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
</form>

  );
};

export default UserSearch;
