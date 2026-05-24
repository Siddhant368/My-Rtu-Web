import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadSyllabus.css";

function SyllabusUpload() {
  const [formData, setFormData] = useState({
    branch: "",
    semester: "",
    title: "",
    pdf: null,
  });

  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH SYLLABUS =================
  const fetchSyllabus = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/syllabus");
      setSyllabus(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSyllabus();
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
      setLoading(true);

      const data = new FormData();

      data.append("branch", formData.branch);
      data.append("semester", formData.semester);
      data.append("title", formData.title);
      data.append("pdf", formData.pdf);

      await axios.post(
        "http://localhost:5000/api/syllabus/upload",
        data
      );

      alert("Syllabus Uploaded Successfully ✅");

      setFormData({
        branch: "",
        semester: "",
        title: "",
        pdf: null,
      });

      fetchSyllabus(); // refresh list
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Upload Failed ❌");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/syllabus/${id}`,
        {
          headers: { role: "admin" }, // if using simple admin check
        }
      );

      setSyllabus((prev) => prev.filter((s) => s._id !== id));

      alert("Deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="syllabus-upload-container">

      {/* ================= UPLOAD FORM ================= */}
      <form className="syllabus-upload-form" onSubmit={handleSubmit}>
        <h1>Upload Syllabus</h1>

        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
        >
          <option value="">Select Branch</option>
          <option value="cse">CSE</option>
          <option value="ece">ECE</option>
          <option value="me">ME</option>
          <option value="ce">CE</option>
        </select>

        <select
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          required
        >
          <option value="">Select Semester</option>
          <option value="sem1">Semester 1</option>
          <option value="sem2">Semester 2</option>
          <option value="sem3">Semester 3</option>
          <option value="sem4">Semester 4</option>
          <option value="sem5">Semester 5</option>
          <option value="sem6">Semester 6</option>
          <option value="sem7">Semester 7</option>
          <option value="sem8">Semester 8</option>
        </select>

        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="pdf"
          accept=".pdf"
          onChange={handleChange}
          required
        />

        <button type="submit">
          {loading ? "Uploading..." : "Upload Syllabus"}
        </button>
      </form>

      {/* ================= LIST ================= */}
      <h2>All Syllabus</h2>

      {syllabus.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{s.title}</h3>

          <p>
            {s.branch} | {s.semester}
          </p>

          <a
            href={`http://localhost:5000/uploads/syllabus/${s.pdf}`}
            target="_blank"
            rel="noreferrer"
          >
            View PDF
          </a>

          <br />

          {/* ================= DELETE BUTTON ================= */}
          <button
            onClick={() => handleDelete(s._id)}
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

export default SyllabusUpload;