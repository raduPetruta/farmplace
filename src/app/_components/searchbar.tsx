// components/SearchBar.js
'use client'
import { useState } from 'react';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="flex justify-center mt-6">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-96 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#00c4cc]"
      />
      <button
        onClick={handleSearch}
        className="bg-[#00c4cc] text-white px-4 py-2 rounded-r-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
