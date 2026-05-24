import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.png";

import {
  FaLaptopCode,
  FaCogs,
  FaBolt,
  FaBuilding,
  FaMicrochip,
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-box">

          <div className="hero-text">
            <h1>
              Welcome to <br /> <span>RTU StudyVerse</span>
            </h1>

            <p>
              Your one-stop platform for RTU B.Tech Notes, Video Lectures,
              Old Papers & AI Learning.
            </p>

            <button
              className="explore-btn"
              onClick={() => navigate("/branch/CSE")}
            >
              Explore Now 🚀
            </button>
          </div>

          <div className="hero-img">
            <img src={hero} alt="RTU StudyVerse" />
          </div>

        </div>
      </section>

      {/* ===== BRANCH SECTION ===== */}
      <section className="branch-section">
        <h2>Choose Your Branch</h2>

        <div className="branch-grid">

          <div className="branch-card" onClick={() => navigate("/branch/CSE")}>
            <FaLaptopCode className="branch-icon cse" />
            <h3>CSE</h3>
            <p>Computer Science Engineering</p>
          </div>

          <div className="branch-card" onClick={() => navigate("/branch/ME")}>
            <FaCogs className="branch-icon me" />
            <h3>ME</h3>
            <p>Mechanical Engineering</p>
          </div>

          <div className="branch-card" onClick={() => navigate("/branch/EE")}>
            <FaBolt className="branch-icon ee" />
            <h3>EE</h3>
            <p>Electrical Engineering</p>
          </div>

          <div className="branch-card" onClick={() => navigate("/branch/CE")}>
            <FaBuilding className="branch-icon ce" />
            <h3>CE</h3>
            <p>Civil Engineering</p>
          </div>

          <div className="branch-card" onClick={() => navigate("/branch/ECE")}>
            <FaMicrochip className="branch-icon ece" />
            <h3>ECE</h3>
            <p>Electronics & Communication</p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;
