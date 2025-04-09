import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScoreSummary from "../components/Quiz/ScoreSummary";

export default function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  if (!state) {
    return (
      <div className="results-error">
        <h2>Quiz Results Not Found</h2>
        <p>We couldn't retrieve your quiz results.</p>
        <button onClick={() => navigate("/")} className="home-button">
          Back to Home
        </button>
      </div>
    );
  }

  const { score = 0, totalQuestions = 1, userAnswers = [], category } = state;

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="results-page">
      <ScoreSummary
        score={score}
        totalQuestions={totalQuestions}
        onRestart={handleRestart}
        category={category}
      />

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="toggle-details"
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && (
        <div className="answer-details">
          {userAnswers.map((item, index) => (
            <div
              key={index}
              className={`answer-item ${
                item.isCorrect ? "correct" : "incorrect"
              }`}
            >
              <p>
                <strong>Question {index + 1}:</strong> {item.question}
              </p>
              <p>Your answer: {item.userAnswer}</p>
              {!item.isCorrect && <p>Correct answer: {item.correctAnswer}</p>}
            </div>
          ))}
        </div>
      )}

      <button onClick={() => navigate("/")} className="home-button">
        Back to Home
      </button>
    </div>
  );
}
