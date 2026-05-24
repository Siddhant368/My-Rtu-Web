import React from "react";
import { useParams, useNavigate } from "react-router-dom";


function BranchDashboard() {
  const { branch } = useParams();
  const navigate = useNavigate();

  return (
    <div className="branch-page">
      <h1>{branch} Engineering</h1>
      <p>Select what you want to explore</p>

      <div className="section">
        <h2>Academics</h2>

        <div className="card-grid">
          <div
            className="card"
            onClick={() => navigate(`/notes/${branch}`)}
          >
            📘 B.Tech Notes
          </div>

          {/* 👇 YAHI HAI TUMHARA SYLLABUS BUTTON */}
          <div
            className="card"
            onClick={() => navigate(`/syllabus/${branch}`)}
          >
            📚 Semester-wise Syllabus
          </div>

          <div
            className="card"
            onClick={() => navigate(`/old-papers/${branch}`)}
          >
            📝 Old RTU Papers
          </div>

          <div
            className="card"
            onClick={() => navigate(`/videos/${branch}`)}
          >
            🎥 Video Lectures
          </div>

          <div
            className="card"
            onClick={() => navigate(`/ai-assistant`)}
          >
            🤖 AI Assistant
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchDashboard;
