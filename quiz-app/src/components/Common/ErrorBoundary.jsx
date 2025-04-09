import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h3>Something went wrong</h3>
          <p>We're having trouble loading the quiz.</p>
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="retry-button"
          >
            Restart Quiz
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
