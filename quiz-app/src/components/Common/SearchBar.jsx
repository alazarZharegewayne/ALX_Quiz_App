import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSearch === "function") {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    if (typeof onSearch === "function") {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search quiz categories..."
          className="search-input"
          aria-label="Search categories"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
