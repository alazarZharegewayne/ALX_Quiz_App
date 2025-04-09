import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import QuizHistory from "../components/history/QuizHistory";
import { fetchCategories } from "../services/api";
import "../styles/quiz.css";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setFilteredCategories(data);
      } catch (err) {
        setError("Failed to load categories. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleSearch = (query = "") => {
    const searchQuery =
      typeof query === "string" ? query.trim().toLowerCase() : "";

    if (!searchQuery) {
      setFilteredCategories(categories);
      return;
    }

    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery)
    );
    setFilteredCategories(filtered);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setError(null);
  };

  const handleContinue = () => {
    if (!selectedCategory) {
      setError("Please select a category");
      return;
    }
    navigate("/setup", { state: { category: selectedCategory } });
  };

  if (isLoading) {
    return <div className="loading-message">Loading categories...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <h1>Select Quiz Category</h1>

      <SearchBar onSearch={handleSearch} />

      {error && <div className="error-message">{error}</div>}

      <div className="category-grid">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${
              selectedCategory?.id === category.id ? "selected" : ""
            }`}
            onClick={() => handleCategorySelect(category)}
          >
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button
          className={`continue-button ${!selectedCategory ? "disabled" : ""}`}
          onClick={handleContinue}
          disabled={!selectedCategory}
        >
          Continue
        </button>
      </div>

      <div className="history-section">
        <QuizHistory />
      </div>
    </div>
  );
}
