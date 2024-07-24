import React, { useState, FormEvent } from "react";
import axios from "axios";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
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
          <div className="form-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn">
            LOGIN
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
