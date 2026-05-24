import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./Semester.css";

function Semester() {
  const { branch, sem } = useParams();
  const navigate = useNavigate();

  const handleNext = () => {
    const defaultSubject = "General"; // Default subject to satisfy Subject route
    navigate(`/subject/${branch}/${sem}/${defaultSubject}`);
  };

  return (
    <div className="semester-page">
      <div className="semester-card">
        <h1>{branch.toUpperCase()} - Semester {sem}</h1>
        <p>Click below to explore your subjects</p>
        <button className="next-btn" onClick={handleNext}>
          Go to Subjects <FaArrowRight className="arrow-icon" />
        </button>
      </div>
    </div>
  );
}

export default Semester;
