import React from "react";
import { FaBookOpen, FaRobot, FaHome, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate("/")}>
        <div className="logo-circle">
          <FaBookOpen className="logo-icon" />
        </div>
        <div className="logo-text">
          <span className="brand">RTU</span>
          <span className="brand-sub">StudyVerse</span>
        </div>
      </div>

      <div className="nav-menu">
        <div className="nav-item" onClick={() => navigate("/")}>
          <FaHome />
          <span>Home</span>
        </div>

       

        {!isLoggedIn ? (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <div className="profile-dropdown">
            <FaUserCircle className="profile-icon" />
            <span className="profile-email">{name || email}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
