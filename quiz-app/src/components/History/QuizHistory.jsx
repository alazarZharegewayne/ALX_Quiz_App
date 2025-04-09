import React from "react";
import { useQuiz } from "../../contexts/QuizContext";

export default function QuizHistory() {
  const { history } = useQuiz();

  return (
    <div className="history-container">
      <h2>Your Quiz History</h2>
      {history.length === 0 ? (
        <p>No quiz attempts yet.</p>
      ) : (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} className="history-item">
              <div className="history-item-header">
                <span className="history-category">{item.category}</span>
                <span className="history-date">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              <div className="history-item-body">
                <span className="history-score">
                  Score: {item.score}/{item.totalQuestions}
                </span>
                <span className="history-percentage">
                  ({Math.round((item.score / item.totalQuestions) * 100)}%)
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
