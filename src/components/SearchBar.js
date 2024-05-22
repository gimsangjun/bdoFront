import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="w-full flex justify-center mt-0 mb-1">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="px-4 py-2 w-800 h-16 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default SearchBar;
