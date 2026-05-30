import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Notes() {
  const { branch, sem, subject, unit } = useParams();

  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "https://my-rtu-web.onrender.com/api/notes"
      );

      const normalize = (str) =>
  (str || "").toLowerCase().trim().replace(/\s+/g, "-");

const filtered = res.data.filter(
  (n) =>
    normalize(n.branch) === normalize(branch) &&
    normalize(n.semester) === normalize(sem) &&
    normalize(n.subject) === normalize(subject) &&
    normalize(n.unit) === normalize(unit)
);
      setNotes(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [branch, sem, subject, unit]);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://my-rtu-web.onrender.com/api/notes/${id}`
      );

      setNotes((prev) =>
        prev.filter((n) => n._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ================= DOWNLOAD =================
  const handleDownload = (file) => {
    const url = `https://my-rtu-web.onrender.com/uploads/notes/${encodeURIComponent(file)}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = file;
    a.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        {subject?.toUpperCase()} - {unit?.toUpperCase()}
      </h1>

      {notes.length === 0 ? (
        <h3>No Notes Found</h3>
      ) : (
        notes.map((n) => (
          <div
            key={n._id}
            style={{
              padding: "15px",
              margin: "10px",
              background: "#f5f5f5",
              cursor: "pointer",
              borderRadius: "10px",
            }}
          >
            {/* PDF OPEN */}
            <div
              onClick={() => {
  console.log("PDF DATA:", n.pdf);

  const fileUrl = `https://my-rtu-web.onrender.com/uploads/notes/${n.pdf}`;

  console.log("FINAL URL:", fileUrl);

  window.open(fileUrl, "_blank");
}}
            >
              📘 {n.title}
            </div>

            {/* BUTTONS */}
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => handleDownload(n.pdf)}
                style={{ marginRight: "10px" }}
              >
                Download
              </button>

              <button onClick={() => handleDelete(n._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Notes;