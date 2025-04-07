import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('quizHistory')) || [];
  });

  const addToHistory = (result) => {
    const newHistory = [...history, result];
    setHistory(newHistory);
    localStorage.setItem('quizHistory', JSON.stringify(newHistory));
  };

  return (
    <QuizContext.Provider value={{ history, addToHistory }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => useContext(QuizContext);