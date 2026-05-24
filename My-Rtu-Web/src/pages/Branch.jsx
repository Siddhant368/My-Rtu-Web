import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import "./Branch.css";

function Branch() {
  const { branch } = useParams();
  const navigate = useNavigate();

  // Semester array
  const semesters = [1,2,3,4,5,6,7,8];

  return (
    <div className="page">
      <div className="page-header">
        <h1>{branch.toLowerCase()} Engineering</h1>
        <p>Select your semester</p>
      </div>

      <div className="card-grid">
        {semesters.map((sem) => (
          <div
            key={sem}
            className="card"
            onClick={() => navigate(`/semester/${branch}/sem${sem}`)}
          >
            <FaBook className="card-icon" />
            <span>Semester {sem}</span>
          </div>
        ))}
      </div>

      <div className="page-footer">
        <p>RTU StudyVerse © 2026</p>
      </div>
    </div>
  );
}

export default Branch;
