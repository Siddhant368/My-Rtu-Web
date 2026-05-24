import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // 🔹 Signup Logic (store user locally)
      if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
      }

      const user = { name, email, password };
      localStorage.setItem("user", JSON.stringify(user));

      alert("Signup Successful 🎉");
      setIsSignup(false);
    } else {
      // 🔹 Login Logic (check localStorage)
      if (!email || !password) {
        alert("Please fill all fields");
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        // ✅ SAVE LOGIN INFO
        localStorage.setItem("token", "dummy-token-123");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", storedUser.name);
        localStorage.setItem("userEmail", storedUser.email);

        onLogin();
        navigate("/");
      } else {
        alert("Invalid Email or Password ❌");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isSignup ? "Create Account ✨" : "Welcome Back 👋"}</h2>
        <p>{isSignup ? "Sign up to RTU StudyVerse" : "Login to RTU StudyVerse"}</p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="login-footer">
          {isSignup ? (
            <>
              <span>Already have an account?</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignup(false);
                }}
              >
                Login
              </a>
            </>
          ) : (
            <>
              <span>Don’t have an account?</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignup(true);
                }}
              >
                Sign up
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;