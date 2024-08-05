import React, { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);


  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000); // 2 seconds
    }
  }, [error]);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username: email,
        password: password,
      });

      console.log("Login response:", response.data);

      if (
        response.status === 200 &&
        response.data.message === "Login successful"
      ) {
        const { is_staff } = response.data;

        localStorage.setItem("authToken", response.data.token);

        const redirectTo = is_staff ? "/admindashboard" : "/employeedashboard";
        window.location.replace(redirectTo);
      } else {
        console.error("Login error:", response.data.error);
        setError("Invalid username or password.");
        setShowError(true)
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
      setShowError(true)
    }
  };

  return (
    <>
      <div className="login-container d-flex flex-column ">
        <div className="web-image mb-6">
          <img
            src="https://beesheetsv2.beehyv.com/assets/images/logo.png"
            alt="Beehyv-Image"
            height={"100px"}
          />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group password-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
          {showError && <p className="error">{error}</p>}
          <button type="submit" className="btn">
            LOGIN
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
