import React, { useState, FormEvent } from "react";
import axios from "axios";
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
          const response = await axios.post('http://localhost:8000/api/login/', {
              username: email,
              password: password
          });

          console.log('Login response:', response.data); 

          if (response.status === 200 && response.data.message === 'Login successful') {
              const { is_staff } = response.data;
       
              localStorage.setItem('authToken',response.data.token)
             
              const redirectTo = is_staff ? '/admindashboard' : '/employeedashboard';
              window.location.replace(redirectTo); 
          } else {
              console.error('Login error:', response.data.error); 
              setError('Invalid username or password.'); 
          }
      } catch (err) {
          console.error('Login error:', err); 
          setError('An error occurred. Please try again.'); 
      }
  };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="btn">LOGIN</button>
            </form>
        </div>
    );
};

export default Login;
