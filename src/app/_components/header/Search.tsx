
import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void; // Continue with functionality to handle search
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setQuery(''); // Clear the input after searching
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or email"
        className="border rounded-md p-2 w-full"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white rounded-md px-4 py-2">
        Search
      </button>
    </form>
  );
};

export default Search;
