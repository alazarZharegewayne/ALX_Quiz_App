import React, { useEffect } from "react";
import { useQuiz } from "../../contexts/QuizContext";

export default function ScoreSummary({
  score,
  totalQuestions,
  onRestart,
  category,
}) {
  const { addToHistory } = useQuiz();

  useEffect(() => {
    addToHistory({
      date: new Date().toISOString(),
      score,
      totalQuestions,
      category: category?.name || "General Knowledge",
    });
  }, []);

  return (
    <div className="score-summary">
      <h1>Quiz Completed!</h1>
      <p className="score-result">
        Your Score: {score}/{totalQuestions}
      </p>
      <button onClick={onRestart} className="restart-button">
        Restart Quiz
      </button>
    </div>
  );
}
