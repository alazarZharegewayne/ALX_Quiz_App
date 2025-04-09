import React from "react";

export default function QuestionCard({ question, onAnswer }) {
  if (!question) {
    return <div className="question-error">No question data available</div>;
  }

  const options = [
    ...(question.incorrect_answers || []),
    question.correct_answer || "",
  ]
    .filter(Boolean)
    .sort(() => Math.random() - 0.5);

  return (
    <div className="question-card">
      <h3
        dangerouslySetInnerHTML={{
          __html: question.question || "No question text",
        }}
      />
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            dangerouslySetInnerHTML={{ __html: option }}
            className="option-button"
          />
        ))}
      </div>
    </div>
  );
}
