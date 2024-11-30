import { useEffect, useState } from "react";

const ArchivePage = ({ username }) => {
  const [wishLists, setWishLists] = useState([]);

  useEffect(() => {
    // Fetch user's lists from the database
    fetch(`/api/lists?username=${username}`)
      .then((response) => response.json())
      .then((data) => setWishLists(data))
      .catch((error) => console.error("Error fetching lists:", error));
  }, [username]);

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Lists</h1>
      {wishLists.length === 0 ? (
        <p>No lists found. Create a new list to get started!</p>
      ) : (
        <ul>
          {wishLists.map((list) => (
            <li
              key={list.id}
              className="mb-4 p-4 bg-dark-accent-800 rounded-lg"
            >
              <h2 className="text-xl font-semibold">{list.title}</h2>
              <p>{list.description}</p>
              {/* Additional list details */}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ArchivePage;
