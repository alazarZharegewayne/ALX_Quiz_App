import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { QuizProvider } from './contexts/QuizContext';
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <QuizProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Quiz App</h1>
          <DarkModeToggle />
        </header>
        <main className="app-main">
          <Outlet /> 
        </main>
      </div>
    </QuizProvider>
  </ThemeProvider>
  )
}

export default App
