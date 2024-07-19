// ErrorPage.tsx

import React from "react";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom"; // Import Navigate for navigation

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log("Navigating to login page...");
    navigate("/login");
  };

  return (
    <div className="error-page">
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <p className="error-message">Page Not Found</p>
        <p className="error-description">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
