import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import SetupPage from "./pages/QuizSetupPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "setup",
        element: <SetupPage />,
      },
      {
        path: "quiz",
        element: <QuizPage />,
      },
      {
        path: "results",
        element: <ResultsPage />,
      },
    ],
  },
]);
