import React from "react";
import { useNavigate } from "react-router-dom";

import AdminNotesPanel
from "../components/AdminNotesPanel";

import "./Admin.css";

function Admin() {

  const navigate = useNavigate();

  return (

    <div className="admin-container">

      {/* SIDEBAR */}
      <div className="sidebar">

        <h2>📊 Admin Panel</h2>

        <ul>

          <li
            onClick={() =>
              navigate("/admin")
            }
          >
            📚 Dashboard
          </li>

          <li
            onClick={() =>
              navigate(
                "/admin/upload-syllabus"
              )
            }
          >
            📘 Upload Syllabus
          </li>

          <li
            onClick={() =>
              navigate(
                "/admin/upload-oldpapers"
              )
            }
          >
            📄 Upload Old Papers
          </li>

          <li
  onClick={() =>
    navigate("/admin/videos")
  }
>
  🎥 Upload Videos
</li>

          <li>
            🗑 Manage Notes
          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* TOP BAR */}
        <div className="topbar">

          <h1>Dashboard</h1>

          <p>
            Manage your RTU Portal
          </p>

        </div>

        {/* STATS CARDS */}
        <div className="cards">

          <div className="card">
            <h3>Total Notes</h3>
            <p>120</p>
          </div>

          <div className="card">
            <h3>Syllabus</h3>
            <p>8</p>
          </div>

          <div className="card">
            <h3>Old Papers</h3>
            <p>45</p>
          </div>

          <div className="card">
            <h3>Videos</h3>
            <p>30</p>
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="cards">

          <div
            className="card"
            onClick={() =>
              navigate(
                "/admin/upload-syllabus"
              )
            }
          >
            <h3>📘 Upload Syllabus</h3>
          </div>

          <div
            className="card"
            onClick={() =>
              navigate(
                "/admin/upload-oldpapers"
              )
            }
          >
            <h3>📄 Upload Old Papers</h3>
          </div>

        </div>

        {/* NOTES PANEL */}
        <div className="panel">

          <AdminNotesPanel />

        </div>

      </div>

    </div>
  );
}

export default Admin;