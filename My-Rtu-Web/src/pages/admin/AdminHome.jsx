import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminHome() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await axios.get("http://localhost:5000/api/notes");
      setNotes(res.data);
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>📊 Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>

        <div style={cardStyle}>
          <h3>Total Notes</h3>
          <p>{notes.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Subjects</h3>
          <p>{new Set(notes.map(n => n.subject)).size}</p>
        </div>

        <div style={cardStyle}>
          <h3>Units</h3>
          <p>{new Set(notes.map(n => n.unit)).size}</p>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  background: "#f1f5f9",
  borderRadius: "10px",
  minWidth: "150px",
};

export default AdminHome;