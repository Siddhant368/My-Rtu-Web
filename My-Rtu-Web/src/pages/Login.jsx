import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
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
        "http://localhost:5000/api/auth/login",
        form
      );

      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT SIDE DESIGN */}
      <div className="auth-left">
        <h1>RTU StudyVerse</h1>
        <p>Welcome back! Login to continue your learning journey.</p>
        <div className="glow-circle"></div>
      </div>

      {/* RIGHT SIDE FORM */}
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
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            {error && <div className="error">{error}</div>}

            <button disabled={loading}>
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