import React, { useState, useEffect } from "react";
import axios from "axios";

function UploadOldPaper() {
  const [formData, setFormData] = useState({
    branch: "",
    semester: "",
    subject: "",
    year: "",
    title: "",
    pdf: null,
  });

  const [papers, setPapers] = useState([]);

  // ================= FETCH PAPERS =================
  const fetchPapers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/oldpapers");
      setPapers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    if (e.target.name === "pdf") {
      setFormData({
        ...formData,
        pdf: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // ================= UPLOAD =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await axios.post(
        "http://localhost:5000/api/oldpapers/upload",
        data
      );

      alert("Old Paper Uploaded");

      setFormData({
        branch: "",
        semester: "",
        subject: "",
        year: "",
        title: "",
        pdf: null,
      });

      fetchPapers(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/oldpapers/${id}`,
        {
          headers: { role: "admin" }, // if using simple admin check
        }
      );

      setPapers((prev) => prev.filter((p) => p._id !== id));

      alert("Deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin - Old Papers</h1>

      {/* ================= UPLOAD FORM ================= */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
        />

        <input
          type="text"
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />

        <input
          type="text"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input type="file" name="pdf" onChange={handleChange} />

        <button type="submit">Upload</button>
      </form>

      {/* ================= LIST ================= */}
      <h2>All Old Papers</h2>

      {papers.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{p.subject}</h3>

          <p>
            {p.branch} | Sem {p.semester} | {p.year}
          </p>

          <a
            href={`http://localhost:5000/uploads/oldpapers/${p.pdf}`}
            target="_blank"
            rel="noreferrer"
          >
            View PDF
          </a>

          <br />

          {/* ================= DELETE BUTTON ================= */}
          <button
            onClick={() => handleDelete(p._id)}
            style={{
              background: "red",
              color: "white",
              marginTop: "10px",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default UploadOldPaper;