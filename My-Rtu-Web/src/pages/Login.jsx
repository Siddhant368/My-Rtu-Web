import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "https://my-rtu-web.onrender.com/api/auth/login",
        form
      );

      login(data);

      alert("Login Successful");
      navigate("/");
    } catch (err) {
      console.log(err);

      setError(
        err?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>RTU StudyVerse</h1>
        <p>Welcome back! Login to continue your learning journey.</p>
        <div className="glow-circle"></div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Sign in</h2>
          <p className="subtitle">Enter your credentials</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error && <div className="error">{error}</div>}

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="bottom-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;