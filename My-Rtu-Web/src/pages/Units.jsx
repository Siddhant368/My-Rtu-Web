import React, { useEffect, useState } from "react";
import "./Units.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Units() {
  const { branch, sem, subject } = useParams();
  const lowerBranch = branch.toLowerCase();
  const navigate = useNavigate();

  const [units, setUnits] = useState([]);

  const fetchUnits = async () => {
    try {
      const res = await axios.get(
        `https://my-rtu-web.onrender.com/api/notes/units/${lowerBranch}/${sem}/${subject}`
      );

      setUnits(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, [branch, sem, subject]);

  return (
    <div className="units-page">
      <h1>{subject.toUpperCase()} Units</h1>

      <div className="units-grid">
        {units.map((unit, i) => (
          <div
            key={i}
            className="unit-card"
            onClick={() =>
              navigate(
                `/notes/${branch}/${sem}/${subject}/${unit}`
              )
            }
          >
            <span className="unit-icon">📂</span>

            <div className="unit-name">
              {unit.toUpperCase()}
            </div>

            <div className="unit-subtitle">
              Open notes & study material
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Units;