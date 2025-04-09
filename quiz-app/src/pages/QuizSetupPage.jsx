import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuizQuestions } from "../services/api";

export default function SetupPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(10);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = async () => {
    if (questionCount < 1 || questionCount > 20) {
      setError("Please choose between 1-20 questions");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const questions = await fetchQuizQuestions(
        questionCount,
        state.category.id,
        difficulty
      );

      if (!questions.length) {
        throw new Error("No questions returned from API");
      }

      navigate("/quiz", {
        state: {
          category: state.category,
          difficulty,
          questionCount,
          questions,
        },
      });
    } catch (err) {
      setError("Failed to load questions. Please try again later.");
      console.error("Question load error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="setup-page">
      <h2>Setup Quiz: {state?.category?.name}</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="setup-option">
        <label>Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={isLoading}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="setup-option">
        <label>Number of Questions:</label>
        <input
          type="number"
          min="1"
          max="20"
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
          disabled={isLoading}
        />
      </div>

      <button
        onClick={handleStartQuiz}
        disabled={isLoading}
        className="start-button"
      >
        {isLoading ? "Loading..." : "Start Quiz"}
      </button>
    </div>
  );
}
