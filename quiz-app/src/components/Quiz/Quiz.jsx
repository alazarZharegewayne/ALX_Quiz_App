import { useState, useEffect } from "react";
import { fetchQuizQuestions } from "../../services/api";
import QuestionCard from "./QuestionCard";

export default function Quiz({ amount, category, difficulty, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuizQuestions(amount, category, difficulty).then(setQuestions);
  }, []);

  if (questions.length === 0) return <div>Loading...</div>;

  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) setScore(score + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onFinish(score);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const options = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <QuestionCard
      question={currentQuestion.question}
      options={options}
      onAnswer={handleAnswer}
      currentQuestion={currentQuestionIndex + 1}
      totalQuestions={questions.length}
    />
  );
}
