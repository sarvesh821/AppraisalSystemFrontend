import { useState } from "react";
import './Login.css'
const Login=()=>{
    const [showPassword, setShowPassword] = useState(false);
return (
    <>
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input type="email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type={showPassword ? "text" : "password"} required />
        </div>
        <div className="form-group">
         
        </div>
        <button type="submit" className="btn">LOGIN IN</button>
       
      </form>
    </div>
    </>
);
}
export default Login