import React, { useContext } from "react";
import { FaBookOpen, FaHome, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">

      {/* LEFT LOGO */}
      <div className="nav-left" onClick={() => navigate("/")}>
        <div className="logo-icon">
          <FaBookOpen />
        </div>
        <div className="logo-text">
          <h2>RTU StudyVerse</h2>
          <span>Learn Smarter</span>
        </div>
      </div>

      {/* CENTER MENU */}
      <div className="nav-center">
        <div className="nav-item" onClick={() => navigate("/")}>
          <FaHome />
          <span>Home</span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="nav-right">

        {!user ? (
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        ) : (
          <div className="profile">

            <div className="profile-icon">
              <FaUserCircle />
            </div>

            <div className="profile-info">
              <p className="name">{user.name || "User"}</p>
              <span className="email">{user.email}</span>
            </div>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;