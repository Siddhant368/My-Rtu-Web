import React from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import "./Subject.css";

function Subject() {

  const {
    branch,
    sem,
    subject,
  } = useParams();

  const navigate = useNavigate();

  const options = [

    {
      title: "B.Tech Notes",

      action: () =>
        navigate(
          `/subjects/${branch}/${sem}`
        ),

      emoji: "📘",
    },

    {
      title: "Semester-wise Syllabus",

      action: () =>
        navigate(
          `/syllabus/${branch}/${sem}`
        ),

      emoji: "📚",
    },

    {
      title: "Old RTU Papers",

      action: () =>
        navigate(
          `/old-papers/${branch}/${sem}`
        ),

      emoji: "📝",
    },

    {
      title: "Video Lectures",

      action: () =>
        navigate(
          `/videos/${branch}/${sem}`
        ),

      emoji: "🎥",
    },

    {
      title: "AI Assistant",

      action: () =>
        navigate(
          `/ai-assistant/${branch}/${sem}`
        ),

      emoji: "🤖",
    },

  ];



  return (

    <div className="notes-container">

      <h1>
        {subject} - {branch} Semester {sem}
      </h1>

      <div className="notes-grid">

        {options.map((item, index) => (

          <div
            key={index}
            className="option-card"
            onClick={item.action}
          >

            <span className="option-emoji">
              {item.emoji}
            </span>

            {item.title}

          </div>

        ))}

      </div>

    </div>
  );
}

export default Subject;