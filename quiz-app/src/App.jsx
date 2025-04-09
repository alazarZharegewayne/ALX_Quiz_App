import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QuizProvider } from "./contexts/QuizContext";
import DarkModeToggle from "./components/Common/DarkModeToggle";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import "./styles/light.css";
import "./styles/dark.css";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QuizProvider>
          <div className="app-container">
            <header className="app-header">
              <h1>Quiz App</h1>
              <DarkModeToggle />
            </header>
            <main className="app-main">
              <Outlet /> {/* This will render the current page component */}
            </main>
          </div>
        </QuizProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
