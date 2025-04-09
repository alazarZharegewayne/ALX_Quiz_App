import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "../components/Quiz/QuestionCard";
import ErrorBoundary from "../components/Common/ErrorBoundary";
import { fetchQuizQuestions } from "../services/api";

export default function QuizPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        if (!state?.questions) {
          if (!state?.category?.id) {
            throw new Error("No category selected");
          }

          const fetchedQuestions = await fetchQuizQuestions(
            state.questionCount || 10,
            state.category.id,
            state.difficulty || "medium"
          );

          if (!fetchedQuestions || !fetchedQuestions.length) {
            throw new Error("No questions available for this category");
          }

          setQuestions(fetchedQuestions);
        } else {
          if (!state.questions.length) {
            throw new Error("No questions provided");
          }
          setQuestions(state.questions);
        }
      } catch (err) {
        setError(err.message);
        console.error("Failed to load questions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [state]);

  const handleAnswer = (selectedAnswer) => {
    try {
      const currentQuestion = questions[currentIndex];
      if (!currentQuestion) {
        throw new Error("Current question not found");
      }

      const isCorrect = selectedAnswer === currentQuestion.correct_answer;
      const newUserAnswers = [
        ...userAnswers,
        {
          question: currentQuestion.question,
          userAnswer: selectedAnswer,
          correctAnswer: currentQuestion.correct_answer,
          isCorrect,
        },
      ];

      setUserAnswers(newUserAnswers);
      if (isCorrect) setScore(score + 1);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        navigate("/results", {
          state: {
            score: isCorrect ? score + 1 : score,
            totalQuestions: questions.length,
            userAnswers: newUserAnswers,
            category: state.category,
          },
        });
      }
    } catch (err) {
      setError("Error processing your answer. Please try again.");
      console.error("Quiz error:", err);
    }
  };

  if (error) {
    return (
      <div className="quiz-error">
        <h3>Oops!</h3>
        <p>{error}</p>
        <button onClick={() => navigate("/")} className="retry-button">
          Back to Home
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="quiz-loading">Loading questions...</div>;
  }

  if (!questions.length) {
    return (
      <div className="quiz-error">
        <h3>No Questions Found</h3>
        <p>We couldn't load any questions for this quiz.</p>
        <button onClick={() => navigate("/")} className="retry-button">
          Back to Categories
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="quiz-page">
        <div className="quiz-header">
          <h2>{state?.category?.name || "Quiz"}</h2>
          <div className="quiz-progress">
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>

        <QuestionCard
          question={questions[currentIndex]}
          onAnswer={handleAnswer}
        />
      </div>
    </ErrorBoundary>
  );
}
