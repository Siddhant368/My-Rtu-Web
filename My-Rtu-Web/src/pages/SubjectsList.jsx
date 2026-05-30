import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SubjectsList.css";

function SubjectsList() {
  const { branch, sem } = useParams();
  const lowerBranch = branch.toLowerCase();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(
        `https://my-rtu-web0319.onrender.com/api/notes/subjects/${lowerBranch}/${sem}`
      );

      setSubjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [branch, sem]);

  return (
    <div className="subjects-page">
      <h1 className="subjects-heading">Subjects</h1>

      {subjects.length === 0 ? (
        <h3 className="no-subjects">No Subjects Found</h3>
      ) : (
        <div className="subjects-grid">
          {subjects.map((subject, i) => (
            <div
              key={i}
              className="subject-card"
              onClick={() =>
                navigate(
                  `/units/${branch}/${sem}/${subject}`
                )
              }
            >
              <span className="subject-icon">📘</span>

              <div className="subject-name">
                {subject.toUpperCase()}
              </div>

              <div className="subject-info">
                Open units, notes & study material
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubjectsList;